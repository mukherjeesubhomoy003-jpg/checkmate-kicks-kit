import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function assertAdmin(ctx: any) {
  const { data } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (!data) throw new Error("Forbidden");
}

export const adminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [p, o, pending, rev] = await Promise.all([
      supabaseAdmin.from("products").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("orders").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabaseAdmin.from("orders").select("total"),
    ]);
    const revenue = (rev.data ?? []).reduce((a, r) => a + Number(r.total ?? 0), 0);
    return { products: p.count ?? 0, orders: o.count ?? 0, pending: pending.count ?? 0, revenue };
  });

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, brand, price, discount_price, is_active, is_featured, is_trending, images, category:categories(name, slug)")
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("orders")
      .select("id, order_number, status, payment_status, total, customer_email, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      orderId: z.string().uuid(),
      status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").update({ status: data.status }).eq("id", data.orderId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleProductFlag = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      productId: z.string().uuid(),
      field: z.enum(["is_active", "is_featured", "is_trending", "is_bestseller", "is_new"]),
      value: z.boolean(),
    }),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patch: any = { [data.field]: data.value };
    const { error } = await supabaseAdmin.from("products").update(patch).eq("id", data.productId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const grantAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ email: z.string().email() }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: list } = await supabaseAdmin.auth.admin.listUsers();
    const u = list.users.find((x) => x.email === data.email);
    if (!u) throw new Error("User not found");
    await supabaseAdmin.from("user_roles").insert({ user_id: u.id, role: "admin" }).select();
    return { ok: true };
  });
