import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const cartItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().nullable(),
  quantity: z.number().int().min(1).max(50),
});

const addressSchema = z.object({
  full_name: z.string().min(1).max(120),
  phone: z.string().min(7).max(20),
  line1: z.string().min(1).max(200),
  line2: z.string().max(200).optional().default(""),
  city: z.string().min(1).max(80),
  state: z.string().min(1).max(80),
  postal_code: z.string().min(3).max(20),
  country: z.string().min(2).max(60).default("India"),
});

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      items: z.array(cartItemSchema).min(1).max(50),
      address: addressSchema,
      email: z.string().email(),
      payment_method: z.enum(["cod", "online"]).default("cod"),
      coupon_code: z.string().max(40).optional(),
      notes: z.string().max(500).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ids = data.items.map((i) => i.productId);
    const { data: products, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id, name, slug, price, discount_price, images")
      .in("id", ids)
      .eq("is_active", true);
    if (pErr) throw new Error(pErr.message);
    const pmap = new Map(products?.map((p) => [p.id, p]));

    const variantIds = data.items.map((i) => i.variantId).filter((x): x is string => !!x);
    const { data: variants } = variantIds.length
      ? await supabaseAdmin.from("product_variants").select("id, product_id, size, color, stock, price_override").in("id", variantIds)
      : { data: [] as { id: string; product_id: string; size: string | null; color: string | null; stock: number; price_override: number | string | null }[] };
    const vmap = new Map(variants?.map((v) => [v.id, v]));

    let subtotal = 0;
    const orderItems: {
      product_id: string; variant_id: string | null; product_name: string;
      variant_label: string | null; image_url: string | null;
      unit_price: number; quantity: number; total_price: number;
    }[] = [];
    for (const it of data.items) {
      const p = pmap.get(it.productId);
      if (!p) throw new Error(`Product unavailable`);
      const v = it.variantId ? vmap.get(it.variantId) : null;
      if (it.variantId && !v) throw new Error("Variant unavailable");
      if (v && v.stock < it.quantity) throw new Error(`Only ${v.stock} left for ${p.name}`);
      const unit = Number(v?.price_override ?? p.discount_price ?? p.price);
      const total = unit * it.quantity;
      subtotal += total;
      const imgs = Array.isArray(p.images) ? (p.images as string[]) : [];
      orderItems.push({
        product_id: p.id,
        variant_id: v?.id ?? null,
        product_name: p.name,
        variant_label: v ? [v.size, v.color].filter(Boolean).join(" / ") || null : null,
        image_url: imgs[0] ?? null,
        unit_price: unit,
        quantity: it.quantity,
        total_price: total,
      });
    }

    // Coupon
    let discount = 0;
    if (data.coupon_code) {
      const { data: c } = await supabaseAdmin
        .from("coupons")
        .select("code, discount_type, discount_value, min_order_amount, max_uses, used_count, is_active, expires_at")
        .eq("code", data.coupon_code.toUpperCase())
        .maybeSingle();
      if (c && c.is_active && (!c.expires_at || new Date(c.expires_at) > new Date()) && subtotal >= Number(c.min_order_amount ?? 0)) {
        discount = c.discount_type === "percent"
          ? Math.round((subtotal * Number(c.discount_value)) / 100)
          : Number(c.discount_value);
      }
    }

    const shipping = subtotal - discount > 1499 ? 0 : 99;
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.05);
    const total = taxable + shipping + tax;

    const { data: orderNum } = await supabaseAdmin.rpc("generate_order_number");
    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: context.userId,
        order_number: orderNum as unknown as string,
        status: "pending",
        payment_method: data.payment_method,
        payment_status: data.payment_method === "cod" ? "pending" : "paid",
        subtotal, tax, shipping, discount, total,
        coupon_code: data.coupon_code?.toUpperCase() ?? null,
        shipping_address: data.address,
        customer_email: data.email,
        customer_phone: data.address.phone,
        notes: data.notes ?? null,
      })
      .select("id, order_number")
      .single();
    if (oErr || !order) throw new Error(oErr?.message ?? "Failed to create order");

    const { error: iErr } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems.map((x) => ({ ...x, order_id: order.id })));
    if (iErr) throw new Error(iErr.message);

    // Decrement variant stock
    for (const it of data.items) {
      if (!it.variantId) continue;
      const v = vmap.get(it.variantId);
      if (!v) continue;
      await supabaseAdmin.from("product_variants").update({ stock: v.stock - it.quantity }).eq("id", v.id);
    }

    // Clear cart
    await supabaseAdmin.from("cart_items").delete().eq("user_id", context.userId);

    return { orderId: order.id, orderNumber: order.order_number };
  });
