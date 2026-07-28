import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const loginJerseyAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1).max(80),
      password: z.string().min(1).max(120),
    }),
  )
  .handler(async ({ data }) => {
    if (data.id.trim() !== "ANKUSHKHATIK123" || data.password !== "ANKUSH@123") {
      throw new Error("Invalid credentials");
    }
    return { token: "cm-jersey-admin-ok-ankush-2026" };
  });

// ============ Per-size stock ============

export const updateJerseySizeStock = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1).max(200),
      updates: z
        .array(
          z.object({
            jersey_id: z.string().regex(/^[a-z0-9-]{2,24}$/i),
            size: z.enum(["S", "M", "L", "XL", "XXL"]),
            stock: z.number().int().min(0).max(9999),
          }),
        )
        .min(1)
        .max(500),
    }),
  )
  .handler(async ({ data }) => {
    if (data.token !== "cm-jersey-admin-ok-ankush-2026") throw new Error("Admin session expired");
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
      size: z.enum(["S", "M", "L", "XL", "XXL"]),
      qty: z.number().int().min(1).max(20),
      unit_price: z.number().int().min(1).max(100000),
      printing_name: z.string().trim().max(40).optional().nullable(),
      printing_number: z.string().trim().max(6).optional().nullable(),
      printing_fee: z.number().int().min(0).max(10000).default(0),
      total: z.number().int().min(1).max(1000000),
      jersey_id: z.string().regex(/^[a-z0-9-]{2,24}$/i).optional().nullable(),
    }),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let order_number = "";
    let saved = false;
    let lastError = "Failed to save order";
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { data: nextNum, error: seqErr } = await supabaseAdmin.rpc(
        "next_jersey_order_number",
      );
      order_number = seqErr || !nextNum
        ? `CHKM-${Date.now().toString(36).toUpperCase()}-${attempt + 1}`
        : String(nextNum);

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
      if (!error) {
        saved = true;
        break;
      }
      lastError = error.message;
      if (error.code !== "23505") break;
    }
    if (!saved) throw new Error(lastError);

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

// Public bulk-cart entry point. Writes one jersey_orders row per line item so
// the admin panel sees every bulk order (including guest checkouts).
export const createBulkJerseyOrders = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      orderNumber: z.string().trim().min(3).max(40).optional(),
      buyer_name: z.string().trim().min(1).max(120),
      buyer_phone: z.string().trim().min(6).max(20),
      address: z.string().trim().min(1).max(400),
      city: z.string().trim().min(1).max(80),
      pincode: z.string().trim().min(3).max(20),
      landmark: z.string().trim().max(200).optional().nullable(),
      post_office: z.string().trim().max(160).optional().nullable(),
      notes: z.string().trim().max(1000).optional().nullable(),
      paid: z.boolean().default(false),
      items: z
        .array(
          z.object({
            name: z.string().trim().min(1).max(200),
            kit: z.string().trim().max(60).optional().nullable(),
            size: z.string().trim().min(1).max(8),
            qty: z.number().int().min(1).max(50),
            unit_price: z.number().int().min(1).max(100000),
          }),
        )
        .min(1)
        .max(50),
    }),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let inserted: { order_number: string }[] = [];
    let baseOrderNumber = "";
    let lastError = "Failed to save bulk order";

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { data: nextNum, error: seqErr } = await supabaseAdmin.rpc(
        "next_jersey_order_number",
      );
      baseOrderNumber = seqErr || !nextNum
        ? `CHKM-${Date.now().toString(36).toUpperCase()}-${attempt + 1}`
        : String(nextNum);

      const rows = data.items.map((it, i) => {
        const suffix = data.items.length === 1
          ? ""
          : i < 26
            ? `-${String.fromCharCode(65 + i)}`
            : `-${i + 1}`;
        return {
          order_number: `${baseOrderNumber}${suffix}`,
          buyer_name: data.buyer_name,
          buyer_phone: data.buyer_phone,
          address: data.address,
          city: data.city,
          pincode: data.pincode,
          landmark: data.landmark || null,
          post_office: data.post_office || "NA",
          item_name: it.name,
          kit: it.kit || null,
          size: it.size,
          qty: it.qty,
          unit_price: it.unit_price,
          printing_name: null,
          printing_number: null,
          printing_fee: 0,
          total: it.unit_price * it.qty,
          payment_status: data.paid ? "paid_screenshot_pending" : "awaiting_screenshot",
          notes: data.notes || null,
        };
      });

      const { data: savedRows, error } = await supabaseAdmin
        .from("jersey_orders")
        .insert(rows)
        .select("order_number");
      if (!error) {
        inserted = savedRows ?? [];
        break;
      }
      lastError = error.message;
      if (error.code !== "23505") break;
    }

    if (inserted.length === 0) throw new Error(lastError);
    return {
      inserted: inserted.length,
      orderNumber: baseOrderNumber,
      orderNumbers: inserted.map((row) => row.order_number),
    };
  });

export const adminListJerseyOrders = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1).max(200) }))
  .handler(async ({ data }) => {
    if (data.token !== "cm-jersey-admin-ok-ankush-2026") throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("jersey_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);
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
    if (data.token !== "cm-jersey-admin-ok-ankush-2026") throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("jersey_orders")
      .update({ dispatch_status: data.dispatch_status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteJerseyOrder = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1).max(200), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    if (data.token !== "cm-jersey-admin-ok-ankush-2026") throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("jersey_orders").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
