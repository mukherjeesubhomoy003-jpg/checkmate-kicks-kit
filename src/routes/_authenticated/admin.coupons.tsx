import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { inr } from "@/lib/format";
import { adminListCoupons } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/coupons")({
  component: Coupons,
});

type Coupon = { id: string; code: string; discount_type: string; discount_value: number; min_order: number; usage_limit: number | null; used_count: number; is_active: boolean; expires_at: string | null };

function Coupons() {
  const listCoupons = useServerFn(adminListCoupons);
  const { data: coupons = [] } = useQuery({ queryKey: ["admin-coupons"], queryFn: () => listCoupons() as Promise<Coupon[]> });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Coupons</h1>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground bg-secondary/40">
            <tr><th className="text-left p-3">Code</th><th className="text-left p-3">Type</th><th className="text-left p-3">Value</th><th className="text-left p-3">Min Order</th><th className="text-left p-3">Used</th><th className="text-left p-3">Active</th></tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-3 font-mono font-bold">{c.code}</td>
                <td className="p-3">{c.discount_type}</td>
                <td className="p-3">{c.discount_type === "percent" ? `${c.discount_value}%` : inr(c.discount_value)}</td>
                <td className="p-3">{inr(c.min_order)}</td>
                <td className="p-3">{c.used_count}{c.usage_limit ? ` / ${c.usage_limit}` : ""}</td>
                <td className="p-3">{c.is_active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
