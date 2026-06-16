import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_ID = "ANKUSHKHATIK123";
const ADMIN_PW = "ANKUSH@123";
const ADMIN_TOKEN = "cm-jersey-admin-ok-ankush-2026";

const stockUpdateSchema = z.object({
  id: z.string().regex(/^j\d{2}$/),
  stock: z.number().int().min(0).max(9999),
});

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

export const updateJerseyStock = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1).max(200),
      updates: z.array(stockUpdateSchema).min(1).max(46),
    }),
  )
  .handler(async ({ data }) => {
    if (data.token !== ADMIN_TOKEN) throw new Error("Admin session expired");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (const update of data.updates) {
      const { error } = await supabaseAdmin
        .from("jersey_stock")
        .update({ stock: update.stock, updated_at: new Date().toISOString() })
        .eq("id", update.id);
      if (error) throw new Error("Could not update stock");
    }
    return { updated: data.updates.length };
  });