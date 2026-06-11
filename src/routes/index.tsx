import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import bannerImg from "@/assets/banner-1.jpg";
import { listCategories, listProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/products/ProductCard";

const catsQ = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });
const featQ = queryOptions({ queryKey: ["products", "featured"], queryFn: () => listProducts({ data: { featured: true, limit: 8 } }) });
const trendQ = queryOptions({ queryKey: ["products", "trending"], queryFn: () => listProducts({ data: { trending: true, limit: 8 } }) });
const newQ = queryOptions({ queryKey: ["products", "new"], queryFn: () => listProducts({ data: { sort: "newest", limit: 4 } }) });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHECKMATE — Premium Football Gear, Shoes & Jerseys" },
      { name: "description", content: "Shop football jerseys, shoes, balls, goalkeeper gloves & training gear at CHECKMATE. Premium quality, fast delivery." },
      { property: "og:title", content: "CHECKMATE — Premium Football Gear" },
      { property: "og:description", content: "Engineered for performance. Jerseys, shoes, balls, gloves & training gear." },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(catsQ),
      context.queryClient.ensureQueryData(featQ),
      context.queryClient.ensureQueryData(trendQ),
      context.queryClient.ensureQueryData(newQ),
    ]);
  },
  component: Home,
});

function Home() {
  const { data: cats } = useSuspenseQuery(catsQ);
  const { data: featured } = useSuspenseQuery(featQ);
  const { data: trending } = useSuspenseQuery(trendQ);
  const { data: fresh } = useSuspenseQuery(newQ);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="" width={1920} height={1080} className="absolute inset-0 size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container-x relative py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Zap className="size-3" /> New Season Drop
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl font-bold leading-[0.95]">
              Engineered<br />for the <span className="text-primary">Pitch</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Pro-grade jerseys, boots, gloves and training kit — built for athletes who play to win.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground glow-primary hover:bg-primary/90">
                Shop the drop <ArrowRight className="size-4" />
              </Link>
              <Link to="/category/$slug" params={{ slug: "shoes" }} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold hover:bg-secondary/60">
                Explore Boots
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-sm">
          {[
            { i: Truck, t: "Free shipping over ₹1499" },
            { i: ShieldCheck, t: "Secure payments" },
            { i: RotateCcw, t: "10-day easy returns" },
            { i: Zap, t: "Same-day dispatch" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
              <x.i className="size-4 text-primary" /> {x.t}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find your gear, fast.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cats.map((c) => (
            <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-card hover:border-primary/60">
              <div className="absolute inset-0 grid place-items-center p-4 text-center">
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Shop →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-10">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Featured</h2>
          <Link to="/shop" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="container-x py-10">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <img src={bannerImg} alt="" loading="lazy" width={1600} height={800} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <div className="max-w-md">
              <div className="text-xs font-bold uppercase tracking-widest text-accent">Training Edit</div>
              <h3 className="mt-3 text-3xl md:text-5xl font-bold">Build the<br />ultimate kit.</h3>
              <p className="mt-3 text-muted-foreground">Cones, ladders, balls and more — everything to level up.</p>
              <Link to="/category/$slug" params={{ slug: "training" }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary">
                Shop Training <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container-x py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Just In</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fresh.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
