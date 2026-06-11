import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { placeOrder } from "@/lib/checkout.functions";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [{ title: "Checkout — CHECKMATE" }] }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const run = useServerFn(placeOrder);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "",
    line1: "", line2: "", city: "", state: "", postal_code: "", country: "India",
    payment_method: "cod" as "cod" | "online",
    coupon: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const shipping = cart.subtotal > 1499 || cart.subtotal === 0 ? 0 : 99;
  const tax = Math.round(cart.subtotal * 0.05);
  const total = cart.subtotal + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/shop" className="mt-4 inline-block text-primary">Shop products</Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await run({
        data: {
          items: cart.items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
          address: {
            full_name: form.full_name, phone: form.phone, line1: form.line1, line2: form.line2,
            city: form.city, state: form.state, postal_code: form.postal_code, country: form.country,
          },
          email: form.email,
          payment_method: form.payment_method,
          coupon_code: form.coupon || undefined,
        },
      });
      cart.clear();
      toast.success(`Order ${res.orderNumber} placed!`);
      navigate({ to: "/account/orders/$id", params: { id: res.orderId } });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const input = "w-full rounded-md bg-card border border-border px-3 py-2.5 text-sm";

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="Email" type="email" value={form.email} onChange={set("email")} className={input} />
              <input required placeholder="Phone" value={form.phone} onChange={set("phone")} className={input} />
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="Full name" value={form.full_name} onChange={set("full_name")} className={`${input} sm:col-span-2`} />
              <input required placeholder="Address line 1" value={form.line1} onChange={set("line1")} className={`${input} sm:col-span-2`} />
              <input placeholder="Address line 2 (optional)" value={form.line2} onChange={set("line2")} className={`${input} sm:col-span-2`} />
              <input required placeholder="City" value={form.city} onChange={set("city")} className={input} />
              <input required placeholder="State" value={form.state} onChange={set("state")} className={input} />
              <input required placeholder="Postal code" value={form.postal_code} onChange={set("postal_code")} className={input} />
              <input required placeholder="Country" value={form.country} onChange={set("country")} className={input} />
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Payment</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${form.payment_method === "cod" ? "border-primary bg-primary/10" : "border-border"}`}>
                <input type="radio" name="pm" checked={form.payment_method === "cod"} onChange={() => setForm((f) => ({ ...f, payment_method: "cod" }))} />
                <div><div className="font-semibold text-sm">Cash on Delivery</div><div className="text-xs text-muted-foreground">Pay when you receive</div></div>
              </label>
              <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${form.payment_method === "online" ? "border-primary bg-primary/10" : "border-border"}`}>
                <input type="radio" name="pm" checked={form.payment_method === "online"} onChange={() => setForm((f) => ({ ...f, payment_method: "online" }))} />
                <div><div className="font-semibold text-sm">Pay online</div><div className="text-xs text-muted-foreground">UPI / Cards / Netbanking</div></div>
              </label>
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-20">
          <h2 className="font-semibold mb-4">Summary</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.items.map((it) => (
              <div key={`${it.productId}-${it.variantId}`} className="flex gap-3 text-sm">
                <img src={it.image} alt="" className="size-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="line-clamp-1">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.variantLabel} × {it.quantity}</div>
                </div>
                <div className="font-semibold">{inr(it.price * it.quantity)}</div>
              </div>
            ))}
          </div>
          <input placeholder="Coupon code" value={form.coupon} onChange={set("coupon")} className={`${input} mt-4`} />
          <dl className="mt-4 space-y-2 text-sm">
            <Row k="Subtotal" v={inr(cart.subtotal)} />
            <Row k="Shipping" v={shipping === 0 ? "Free" : inr(shipping)} />
            <Row k="Tax" v={inr(tax)} />
            <div className="border-t border-border my-2" />
            <Row k="Total" v={inr(total)} bold />
          </dl>
          <button disabled={loading} className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground glow-primary disabled:opacity-50">
            {loading ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return <div className={`flex justify-between ${bold ? "text-base font-bold" : ""}`}><dt>{k}</dt><dd>{v}</dd></div>;
}
