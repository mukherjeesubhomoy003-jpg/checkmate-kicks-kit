import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminListOrders, updateOrderStatus } from "@/lib/admin.functions";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrders,
});

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

function AdminOrders() {
  const fn = useServerFn(adminListOrders);
  const update = useServerFn(updateOrderStatus);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-orders"], queryFn: () => fn() });

  async function setStatus(orderId: string, status: typeof STATUSES[number]) {
    try {
      await update({ data: { orderId, status } });
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order updated");
    } catch (e) { toast.error((e as Error).message); }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground bg-secondary/40">
            <tr><th className="text-left p-3">Order</th><th className="text-left p-3">Email</th><th className="text-left p-3">Total</th><th className="text-left p-3">Payment</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr>
          </thead>
          <tbody>
            {data?.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-3 font-mono">{o.order_number}</td>
                <td className="p-3">{o.customer_email}</td>
                <td className="p-3 font-semibold">{inr(o.total)}</td>
                <td className="p-3"><span className="text-xs uppercase">{o.payment_status}</span></td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as typeof STATUSES[number])} className="rounded-md bg-secondary border border-border px-2 py-1 text-xs">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
