import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_ID = "ANKUSHKHATIK123";
const ADMIN_PW = "ANKUSH@123";
const ADMIN_TOKEN = "cm-jersey-admin-ok-ankush-2026";

const SIZE = z.enum(["S", "M", "L", "XL", "XXL"]);

export const loginJerseyAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1).max(80),
      password: z.string().min(1).max(120),
    }),
  )
  .handler(async ({ data }) => {
    if (data.id.trim() !== ADMIN_ID || data.password !== ADMIN_PW) {
      throw new Error("Invalid credentials");
    }
    return { token: ADMIN_TOKEN };
  });

// ============ Per-size stock ============

export const updateJerseySizeStock = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1).max(200),
      updates: z
        .array(
          z.object({
            jersey_id: z.string().regex(/^j\d{2}$/),
            size: SIZE,
            stock: z.number().int().min(0).max(9999),
          }),
        )
        .min(1)
        .max(500),
    }),
  )
  .handler(async ({ data }) => {
    if (data.token !== ADMIN_TOKEN) throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const rows = data.updates.map((u) => ({
      jersey_id: u.jersey_id,
      size: u.size,
      stock: u.stock,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabaseAdmin
      .from("jersey_size_stock")
      .upsert(rows, { onConflict: "jersey_id,size" });
    if (error) throw new Error(error.message);
    return { updated: rows.length };
  });

// ============ Orders ============

export const createJerseyOrder = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      buyer_name: z.string().trim().min(1).max(120),
      buyer_phone: z.string().regex(/^[6-9]\d{9}$/),
      address: z.string().trim().min(1).max(400),
      city: z.string().trim().min(1).max(80),
      pincode: z.string().regex(/^\d{6}$/),
      landmark: z.string().trim().max(160).optional().nullable(),
      post_office: z.string().trim().max(120).optional().nullable(),
      item_name: z.string().trim().min(1).max(160),
      kit: z.string().trim().max(20).optional().nullable(),
      size: SIZE,
      qty: z.number().int().min(1).max(20),
      unit_price: z.number().int().min(1).max(100000),
      printing_name: z.string().trim().max(40).optional().nullable(),
      printing_number: z.string().trim().max(6).optional().nullable(),
      printing_fee: z.number().int().min(0).max(10000).default(0),
      total: z.number().int().min(1).max(1000000),
      jersey_id: z.string().regex(/^j\d{2}$/).optional().nullable(),
    }),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Reserve sequential order number from DB sequence
    const { data: nextNum, error: seqErr } = await supabaseAdmin.rpc(
      "next_jersey_order_number",
    );
    let order_number: string;
    if (seqErr || !nextNum) {
      const { count } = await supabaseAdmin
        .from("jersey_orders")
        .select("*", { count: "exact", head: true });
      order_number = `CHKM-${String((count ?? 0) + 1).padStart(4, "0")}`;
    } else {
      order_number = String(nextNum);
    }

    const { error } = await supabaseAdmin.from("jersey_orders").insert({
      order_number,
      buyer_name: data.buyer_name,
      buyer_phone: data.buyer_phone,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
      landmark: data.landmark || null,
      post_office: data.post_office || "NA",
      item_name: data.item_name,
      kit: data.kit || null,
      size: data.size,
      qty: data.qty,
      unit_price: data.unit_price,
      printing_name: data.printing_name || null,
      printing_number: data.printing_number || null,
      printing_fee: data.printing_fee,
      total: data.total,
    });
    if (error) throw new Error(error.message);

    // Best-effort stock decrement (won't go negative due to CHECK)
    if (data.jersey_id) {
      const { data: row } = await supabaseAdmin
        .from("jersey_size_stock")
        .select("stock")
        .eq("jersey_id", data.jersey_id)
        .eq("size", data.size)
        .maybeSingle();
      const next = Math.max(0, (row?.stock ?? 0) - data.qty);
      await supabaseAdmin
        .from("jersey_size_stock")
        .update({ stock: next, updated_at: new Date().toISOString() })
        .eq("jersey_id", data.jersey_id)
        .eq("size", data.size);
    }

    return { order_number };
  });

export const adminListJerseyOrders = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    if (data.token !== ADMIN_TOKEN) throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("jersey_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateJerseyOrderDispatch = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1).max(200),
      id: z.string().uuid(),
      dispatch_status: z.enum(["pending", "ready", "dispatched", "delivered", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    if (data.token !== ADMIN_TOKEN) throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("jersey_orders")
      .update({ dispatch_status: data.dispatch_status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
