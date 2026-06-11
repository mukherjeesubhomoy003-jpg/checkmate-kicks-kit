import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listCategories, listProducts } from "@/lib/products.functions";
import { ProductCard } from "@/components/products/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(
        queryOptions({ queryKey: ["products", "cat", params.slug], queryFn: () => listProducts({ data: { category: params.slug, limit: 60 } }) }),
      ),
      context.queryClient.ensureQueryData(queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() })),
    ]);
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — CHECKMATE` },
      { name: "description", content: `Shop ${params.slug.replace(/-/g, " ")} at CHECKMATE.` },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cats = useSuspenseQuery(queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() }));
  const cat = cats.data.find((c) => c.slug === slug);
  const prods = useSuspenseQuery(
    queryOptions({ queryKey: ["products", "cat", slug], queryFn: () => listProducts({ data: { category: slug, limit: 60 } }) }),
  );
  return (
    <div className="container-x py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-primary">Category</div>
        <h1 className="text-4xl md:text-5xl font-bold mt-2">{cat?.name ?? slug}</h1>
        {cat?.description && <p className="text-muted-foreground mt-2 max-w-2xl">{cat.description}</p>}
      </div>
      {prods.data.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No products in this category yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prods.data.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
