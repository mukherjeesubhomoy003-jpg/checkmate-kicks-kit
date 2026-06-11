import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getProduct } from "@/lib/products.functions";
import { useCart } from "@/lib/cart-context";
import { inr, firstImage } from "@/lib/format";

const opts = (slug: string) => queryOptions({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!data) throw notFound();
  },
  head: ({ params, loaderData: _ }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — CHECKMATE` },
      { name: "description", content: `Buy ${params.slug.replace(/-/g, " ")} at CHECKMATE.` },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(opts(slug));
  const cart = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  type Variant = { id: string; size: string | null; color: string | null; stock: number; price_override: number | string | null };
  const variants: Variant[] = (p as unknown as { variants?: Variant[] }).variants ?? [];
  const [variantId, setVariantId] = useState<string | null>(variants[0]?.id ?? null);

  if (!p) return null;
  const product = p as unknown as {
    id: string; name: string; slug: string; brand: string | null; description: string | null;
    price: number; discount_price: number | null; images: unknown; rating_avg: number; rating_count: number;
    reviews: { id: string; rating: number; title: string | null; body: string | null; created_at: string }[];
    category?: { name: string; slug: string } | null;
  };
  const imgs = Array.isArray(product.images) ? (product.images as string[]) : [];
  const heroImg = imgs[imgIdx] ?? firstImage(product.images);
  const v = variants.find((x) => x.id === variantId) ?? null;
  const price = v?.price_override ? Number(v.price_override) : Number(product.discount_price ?? product.price);
  const compare = product.discount_price ? Number(product.price) : null;
  const stock = v?.stock ?? 0;

  return (
    <div className="container-x py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        {product.category && (<> / <Link to="/category/$slug" params={{ slug: product.category.slug }} className="hover:text-foreground">{product.category.name}</Link></>)}
      </nav>
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-card">
            <img src={heroImg} alt={product.name} className="size-full object-cover" />
          </div>
          {imgs.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {imgs.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`size-20 shrink-0 overflow-hidden rounded-lg border ${i === imgIdx ? "border-primary" : "border-border"}`}>
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.brand && <div className="text-xs uppercase tracking-widest text-primary">{product.brand}</div>}
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">{product.name}</h1>
          {Number(product.rating_avg) > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.round(Number(product.rating_avg)) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                ))}
              </div>
              <span className="text-muted-foreground">({product.rating_count} reviews)</span>
            </div>
          )}
          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-3xl font-bold">{inr(price)}</div>
            {compare && <div className="text-lg text-muted-foreground line-through">{inr(compare)}</div>}
          </div>
          {product.description && <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>}

          {variants.length > 0 && (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Select size</div>
              <div className="flex flex-wrap gap-2">
                {variants.map((vr) => (
                  <button
                    key={vr.id}
                    disabled={vr.stock === 0}
                    onClick={() => setVariantId(vr.id)}
                    className={`min-w-[3rem] rounded-md border px-3 py-2 text-sm font-medium ${vr.id === variantId ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50"} ${vr.stock === 0 ? "opacity-40 line-through cursor-not-allowed" : ""}`}
                  >
                    {vr.size ?? vr.color ?? "Default"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 text-sm">
            {stock > 0 ? (
              <span className="text-success">In stock — {stock} available</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              disabled={stock === 0}
              onClick={() => {
                cart.add({
                  productId: product.id,
                  variantId: v?.id ?? null,
                  slug: product.slug,
                  name: product.name,
                  image: heroImg,
                  price,
                  variantLabel: v ? [v.size, v.color].filter(Boolean).join(" / ") : null,
                  quantity: 1,
                });
                toast.success("Added to cart");
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground glow-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <ShoppingBag className="size-4" /> Add to Cart
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-border px-4 py-3.5 hover:bg-secondary" aria-label="Wishlist">
              <Heart className="size-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            {[
              { i: Truck, t: "Free shipping over ₹1499" },
              { i: ShieldCheck, t: "Secure checkout" },
              { i: RotateCcw, t: "10-day returns" },
            ].map((x, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3 flex items-center gap-2">
                <x.i className="size-4 text-primary" /> {x.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  ))}
                </div>
                {r.title && <div className="mt-2 font-semibold">{r.title}</div>}
                {r.body && <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
