import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { listCategories, listProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/products/ProductCard";

const search = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop All — CHECKMATE" },
      { name: "description", content: "Browse the full CHECKMATE catalogue of football gear." },
      { property: "og:title", content: "Shop All — CHECKMATE" },
      { property: "og:description", content: "Browse the full CHECKMATE catalogue." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const cats = useQuery({ queryKey: ["categories"], queryFn: () => listCategories() });
  const prods = useQuery({
    queryKey: ["products", "shop", search],
    queryFn: () => listProducts({ data: { q: search.q, category: search.category, sort: search.sort, limit: 60 } }),
  });

  return (
    <div className="container-x py-10">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Shop All</h1>
          <p className="text-muted-foreground mt-1">{prods.data?.length ?? 0} products</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            defaultValue={search.q ?? ""}
            placeholder="Search…"
            onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, q: e.target.value || undefined }) })}
            className="rounded-md bg-card border border-border px-3 py-2 text-sm w-56"
          />
          <select
            value={search.sort ?? "newest"}
            onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, sort: e.target.value as never }) })}
            className="rounded-md bg-card border border-border px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-2">
          <div className="text-sm font-semibold mb-2">Categories</div>
          <Link to="/shop" search={{}} className={`block rounded-md px-3 py-2 text-sm ${!search.category ? "bg-primary/15 text-primary" : "hover:bg-secondary"}`}>
            All
          </Link>
          {cats.data?.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.slug }}
              className={`block rounded-md px-3 py-2 text-sm ${search.category === c.slug ? "bg-primary/15 text-primary" : "hover:bg-secondary"}`}
            >
              {c.name}
            </Link>
          ))}
        </aside>
        <div>
          {prods.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-card animate-pulse" />)}
            </div>
          ) : prods.data && prods.data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {prods.data.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
