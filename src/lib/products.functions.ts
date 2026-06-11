import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Public read functions. Use admin client for unauthenticated reads with explicit projection.
export const listProducts = createServerFn({ method: "GET" })
  .inputValidator(
    z
      .object({
        category: z.string().optional(),
        q: z.string().optional(),
        featured: z.boolean().optional(),
        trending: z.boolean().optional(),
        bestseller: z.boolean().optional(),
        sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).optional(),
        limit: z.number().int().min(1).max(60).optional(),
      })
      .optional()
      .default({}),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("products")
      .select(
        "id, slug, name, brand, price, discount_price, images, rating_avg, rating_count, is_new, is_bestseller, is_trending, is_featured, category_id",
      )
      .eq("is_active", true);
    if (data.category) {
      const { data: cat } = await supabaseAdmin
        .from("categories")
        .select("id")
        .eq("slug", data.category)
        .maybeSingle();
      if (cat) q = q.eq("category_id", cat.id);
    }
    if (data.q) q = q.ilike("name", `%${data.q}%`);
    if (data.featured) q = q.eq("is_featured", true);
    if (data.trending) q = q.eq("is_trending", true);
    if (data.bestseller) q = q.eq("is_bestseller", true);
    switch (data.sort) {
      case "price_asc": q = q.order("price", { ascending: true }); break;
      case "price_desc": q = q.order("price", { ascending: false }); break;
      case "rating": q = q.order("rating_avg", { ascending: false }); break;
      default: q = q.order("created_at", { ascending: false });
    }
    q = q.limit(data.limit ?? 24);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("id, slug, name, description, image_url, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1).max(160) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .select("*, category:categories(id, name, slug), variants:product_variants(id, size, color, stock, price_override)")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;
    const { data: reviews } = await supabaseAdmin
      .from("reviews")
      .select("id, rating, title, body, created_at")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false })
      .limit(20);
    return { ...product, reviews: reviews ?? [] };
  });
