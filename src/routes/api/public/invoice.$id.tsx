import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/invoice/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: order } = await supabaseAdmin
          .from("orders")
          .select("*, order_items(*)")
          .eq("id", params.id)
          .maybeSingle();
        if (!order) return new Response("Not found", { status: 404 });

        const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(n));
        const addr = (order.shipping_address ?? {}) as Record<string, string>;
        const items = ((order.order_items ?? []) as { product_name: string; variant_label: string | null; unit_price: number; quantity: number; total_price: number }[]);
        const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Invoice ${order.order_number}</title>
<style>
  *{box-sizing:border-box}body{font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#0a0a1a;padding:32px;max-width:800px;margin:auto}
  h1{margin:0;font-size:28px;color:#4f46e5}.muted{color:#64748b;font-size:13px}
  table{width:100%;border-collapse:collapse;margin-top:24px}th,td{padding:10px;border-bottom:1px solid #e5e7eb;text-align:left;font-size:14px}
  th{background:#f8fafc;font-size:12px;text-transform:uppercase;letter-spacing:.05em}
  .right{text-align:right}.tot{font-weight:700;font-size:16px}
  .flex{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}
  .box{padding:16px;background:#f8fafc;border-radius:12px}
  @media print{body{padding:0}.no-print{display:none}}
</style></head><body>
<div class="flex">
  <div>
    <h1>CHECKMATE</h1>
    <div class="muted">Premium Football Gear</div>
  </div>
  <div class="right">
    <div style="font-weight:700;font-size:18px">INVOICE</div>
    <div class="muted">${order.order_number}</div>
    <div class="muted">${new Date(order.created_at).toLocaleDateString()}</div>
  </div>
</div>
<div class="flex" style="margin-top:24px">
  <div class="box" style="flex:1">
    <div class="muted" style="margin-bottom:4px">BILL TO</div>
    <div style="font-weight:600">${addr.full_name ?? ""}</div>
    <div>${addr.line1 ?? ""}</div>
    ${addr.line2 ? `<div>${addr.line2}</div>` : ""}
    <div>${addr.city ?? ""}, ${addr.state ?? ""} ${addr.postal_code ?? ""}</div>
    <div>${addr.country ?? ""}</div>
    <div style="margin-top:6px">${order.customer_email ?? ""} • ${order.customer_phone ?? ""}</div>
  </div>
  <div class="box" style="flex:1">
    <div class="muted" style="margin-bottom:4px">PAYMENT</div>
    <div>Method: ${order.payment_method?.toUpperCase()}</div>
    <div>Status: ${order.payment_status?.toUpperCase()}</div>
    <div>Order: ${order.status?.toUpperCase()}</div>
  </div>
</div>
<table>
  <thead><tr><th>Item</th><th class="right">Qty</th><th class="right">Unit</th><th class="right">Total</th></tr></thead>
  <tbody>
    ${items.map((it) => `<tr><td>${it.product_name}${it.variant_label ? `<div class="muted">${it.variant_label}</div>` : ""}</td><td class="right">${it.quantity}</td><td class="right">${inr(Number(it.unit_price))}</td><td class="right">${inr(Number(it.total_price))}</td></tr>`).join("")}
  </tbody>
</table>
<table style="margin-top:8px">
  <tr><td>Subtotal</td><td class="right">${inr(Number(order.subtotal))}</td></tr>
  ${Number(order.discount) > 0 ? `<tr><td>Discount</td><td class="right">- ${inr(Number(order.discount))}</td></tr>` : ""}
  <tr><td>Shipping</td><td class="right">${Number(order.shipping) === 0 ? "Free" : inr(Number(order.shipping))}</td></tr>
  <tr><td>Tax (GST)</td><td class="right">${inr(Number(order.tax))}</td></tr>
  <tr class="tot"><td>Total</td><td class="right">${inr(Number(order.total))}</td></tr>
</table>
<p class="muted" style="margin-top:32px">Thank you for shopping with CHECKMATE. For support contact support@checkmate.shop</p>
<button class="no-print" onclick="window.print()" style="margin-top:16px;padding:10px 20px;background:#4f46e5;color:#fff;border:0;border-radius:8px;cursor:pointer">Print / Save as PDF</button>
</body></html>`;
        return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
      },
    },
  },
});
