import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const myOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, order_number, status, payment_status, total, created_at, order_items(id, product_name, variant_label, quantity, unit_price, image_url)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const myProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: profile } = await context.supabase.from("profiles").select("*").eq("id", context.userId).maybeSingle();
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { profile, isAdmin: !!isAdmin };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ full_name: z.string().min(1).max(120), phone: z.string().max(20).optional() }))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("profiles").update(data).eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
