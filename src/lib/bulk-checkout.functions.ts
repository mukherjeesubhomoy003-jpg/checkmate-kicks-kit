import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const bulkItemSchema = z.object({
  name: z.string().min(1).max(200),
  image: z.string().max(2000).nullable().optional(),
  variantLabel: z.string().max(120).nullable().optional(),
  unitPrice: z.number().min(0),
  quantity: z.number().int().min(1).max(500),
});

const bulkAddressSchema = z.object({
  full_name: z.string().min(1).max(120),
  phone: z.string().min(7).max(20),
  line1: z.string().min(1).max(300),
  line2: z.string().max(200).optional().default(""),
  city: z.string().min(1).max(80),
  state: z.string().max(80).optional().default(""),
  postal_code: z.string().min(3).max(20),
  country: z.string().min(2).max(60).default("India"),
});

export const placeBulkOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      orderNumber: z.string().min(3).max(40),
      items: z.array(bulkItemSchema).min(1).max(100),
      address: bulkAddressSchema,
      email: z.string().email().optional().nullable(),
      notes: z.string().max(1000).optional().nullable(),
      paid: z.boolean().default(false),
    }),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const subtotal = data.items.reduce((a, b) => a + b.unitPrice * b.quantity, 0);
    const total = subtotal; // free shipping, no tax on bulk flow

    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: context.userId,
        order_number: data.orderNumber,
        status: "pending",
        payment_method: "upi",
        payment_status: data.paid ? "paid" : "pending",
        subtotal,
        tax: 0,
        shipping: 0,
        discount: 0,
        total,
        shipping_address: data.address,
        customer_email: data.email ?? null,
        customer_phone: data.address.phone,
        notes: data.notes ?? null,
      })
      .select("id, order_number")
      .single();
    if (oErr || !order) throw new Error(oErr?.message ?? "Failed to create order");

    const { error: iErr } = await supabaseAdmin.from("order_items").insert(
      data.items.map((it) => ({
        order_id: order.id,
        product_id: null,
        variant_id: null,
        product_name: it.name,
        variant_label: it.variantLabel ?? null,
        image_url: it.image ?? null,
        unit_price: it.unitPrice,
        quantity: it.quantity,
        total_price: it.unitPrice * it.quantity,
      })),
    );
    if (iErr) throw new Error(iErr.message);

    return { orderId: order.id, orderNumber: order.order_number };
  });
