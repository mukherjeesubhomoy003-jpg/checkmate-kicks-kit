import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { myOrders } from "@/lib/account.functions";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/account/orders")({
  head: () => ({ meta: [{ title: "My Orders — CHECKMATE" }] }),
  component: Orders,
});

function Orders() {
  const fn = useServerFn(myOrders);
  const { data, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => fn() });
  if (isLoading) return <div className="py-10 text-muted-foreground">Loading…</div>;
  if (!data || data.length === 0)
    return (
      <div className="py-10">
        <h1 className="text-2xl font-bold">No orders yet</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary">Start shopping →</Link>
      </div>
    );
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-3">
        {data.map((o) => (
          <Link key={o.id} to="/account/orders/$id" params={{ id: o.id }} className="block rounded-2xl border border-border bg-card p-5 hover:border-primary/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-semibold">#{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/15 text-primary text-xs px-2 py-0.5 uppercase">{o.status}</span>
                <div className="font-bold">{inr(o.total)}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              {(o.order_items ?? []).map((it) => it.product_name).join(", ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
