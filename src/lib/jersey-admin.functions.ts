import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_CREDENTIAL_HASH = "0669589e15f2c104278df157f867736c5d8006b3d367d355ee0812438a3d043a";

const stockUpdateSchema = z.object({
  id: z.string().regex(/^j\d{2}$/),
  stock: z.number().int().min(0).max(9999),
});

const tokenSchema = z.object({
  token: z.string().min(20).max(1000),
});

function getSigningSecret() {
  const secret = process.env.LOVABLE_API_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Admin service is unavailable");
  return secret;
}

export const loginJerseyAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1).max(80),
      password: z.string().min(1).max(120),
    }),
  )
  .handler(async ({ data }) => {
    const { createHmac } = await import("crypto");
    const attemptedHash = createHmac("sha256", getSigningSecret())
      .update(`${data.id.trim()}\u0000${data.password}`)
      .digest("hex");
    if (attemptedHash !== ADMIN_CREDENTIAL_HASH) {
      throw new Error("Invalid credentials");
    }

    const payload = Buffer.from(
      JSON.stringify({ sub: "jersey-admin", exp: Date.now() + 1000 * 60 * 60 * 4 }),
    ).toString("base64url");
    const signature = createHmac("sha256", getSigningSecret()).update(payload).digest("base64url");
    return { token: `${payload}.${signature}` };
  });

async function assertAdminToken(token: string) {
  const { createHmac } = await import("crypto");
  const [payload, signature] = token.split(".");
  if (!payload || !signature) throw new Error("Admin session expired");
  const expected = createHmac("sha256", getSigningSecret()).update(payload).digest("base64url");
  if (signature !== expected) throw new Error("Admin session expired");
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { sub?: string; exp?: number };
  if (parsed.sub !== "jersey-admin" || !parsed.exp || parsed.exp < Date.now()) {
    throw new Error("Admin session expired");
  }
}

export const updateJerseyStock = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: tokenSchema.shape.token,
      updates: z.array(stockUpdateSchema).min(1).max(46),
    }),
  )
  .handler(async ({ data }) => {
    await assertAdminToken(data.token);
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