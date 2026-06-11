import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminListProducts, toggleProductFlag } from "@/lib/admin.functions";
import { inr, firstImage } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: Products,
});

function Products() {
  const fn = useServerFn(adminListProducts);
  const toggle = useServerFn(toggleProductFlag);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-products"], queryFn: () => fn() });

  async function flip(productId: string, field: "is_active" | "is_featured" | "is_trending", value: boolean) {
    try {
      await toggle({ data: { productId, field, value } });
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Updated");
    } catch (e) { toast.error((e as Error).message); }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground bg-secondary/40">
            <tr><th className="text-left p-3">Product</th><th className="text-left p-3">Category</th><th className="text-left p-3">Price</th><th className="text-left p-3">Active</th><th className="text-left p-3">Featured</th><th className="text-left p-3">Trending</th></tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 flex items-center gap-3 min-w-[260px]">
                  <img src={firstImage(p.images)} alt="" className="size-10 rounded object-cover" />
                  <div>
                    <div className="font-medium line-clamp-1">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.brand}</div>
                  </div>
                </td>
                <td className="p-3">{(p.category as { name?: string } | null)?.name ?? "—"}</td>
                <td className="p-3">{inr(p.discount_price ?? p.price)}</td>
                <td className="p-3"><Toggle checked={p.is_active} onChange={(v) => flip(p.id, "is_active", v)} /></td>
                <td className="p-3"><Toggle checked={p.is_featured} onChange={(v) => flip(p.id, "is_featured", v)} /></td>
                <td className="p-3"><Toggle checked={p.is_trending} onChange={(v) => flip(p.id, "is_trending", v)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-primary" : "bg-secondary"}`}>
      <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}
