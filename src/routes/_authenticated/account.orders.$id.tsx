import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { inr } from "@/lib/format";
import { createInvoiceLink, myOrderDetail } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/account/orders/$id")({
  head: () => ({ meta: [{ title: "Order — CHECKMATE" }] }),
  component: OrderDetail,
});

type Order = {
  id: string; order_number: string; status: string; payment_method: string; payment_status: string;
  subtotal: number; tax: number; shipping: number; discount: number; total: number;
  shipping_address: Record<string, string>; created_at: string;
  order_items: { id: string; product_name: string; variant_label: string | null; image_url: string | null; unit_price: number; quantity: number; total_price: number }[];
};

function OrderDetail() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const getInvoiceLink = useServerFn(createInvoiceLink);
  const getOrderDetail = useServerFn(myOrderDetail);
  useEffect(() => {
    (async () => {
      const data = await getOrderDetail({ data: { orderId: id } });
      setOrder(data as unknown as Order);
      setLoading(false);
    })();
  }, [id, getOrderDetail]);

  if (loading) return <div className="py-10 text-muted-foreground">Loading…</div>;
  if (!order) return <div className="py-10">Order not found.</div>;
  const addr = order.shipping_address;
  async function openInvoice() {
    if (!order) return;
    setInvoiceLoading(true);
    try {
      const { href } = await getInvoiceLink({ data: { orderId: order.id } });
      window.open(href, "_blank", "noopener,noreferrer");
    } finally {
      setInvoiceLoading(false);
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link to="/account/orders" className="text-sm text-muted-foreground hover:text-primary">← All orders</Link>
          <h1 className="text-3xl font-bold mt-2">Order #{order.order_number}</h1>
          <div className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</div>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-primary/15 text-primary text-xs px-3 py-1 uppercase">{order.status}</span>
          <span className="rounded-full bg-accent/15 text-accent text-xs px-3 py-1 uppercase">{order.payment_status}</span>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          {order.order_items.map((it) => (
            <div key={it.id} className="flex gap-4">
              {it.image_url && <img src={it.image_url} alt="" className="size-20 rounded-lg object-cover" />}
              <div className="flex-1">
                <div className="font-semibold">{it.product_name}</div>
                {it.variant_label && <div className="text-xs text-muted-foreground">{it.variant_label}</div>}
                <div className="text-sm text-muted-foreground mt-1">{inr(it.unit_price)} × {it.quantity}</div>
              </div>
              <div className="font-bold">{inr(it.total_price)}</div>
            </div>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-2">Summary</h3>
            <div className="text-sm space-y-1">
              <Row k="Subtotal" v={inr(order.subtotal)} />
              <Row k="Discount" v={`- ${inr(order.discount)}`} />
              <Row k="Shipping" v={order.shipping === 0 ? "Free" : inr(order.shipping)} />
              <Row k="Tax" v={inr(order.tax)} />
              <div className="border-t border-border my-2" />
              <Row k="Total" v={inr(order.total)} bold />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-2">Shipping</h3>
            <div className="text-sm text-muted-foreground">
              <div className="text-foreground font-medium">{addr.full_name}</div>
              <div>{addr.line1}</div>
              {addr.line2 && <div>{addr.line2}</div>}
              <div>{addr.city}, {addr.state} {addr.postal_code}</div>
              <div>{addr.country}</div>
              <div className="mt-2">{addr.phone}</div>
            </div>
          </div>
          <button type="button" onClick={openInvoice} disabled={invoiceLoading} className="block w-full text-center rounded-full bg-primary px-4 py-2.5 font-semibold text-primary-foreground glow-primary disabled:opacity-60">
            {invoiceLoading ? "Preparing…" : "Download Invoice"}
          </button>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return <div className={`flex justify-between ${bold ? "text-base font-bold text-foreground" : ""}`}><dt>{k}</dt><dd>{v}</dd></div>;
}
