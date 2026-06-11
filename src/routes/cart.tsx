import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — CHECKMATE" }, { name: "description", content: "Review your CHECKMATE cart before checkout." }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const shipping = cart.subtotal > 1499 || cart.subtotal === 0 ? 0 : 99;
  const tax = Math.round(cart.subtotal * 0.05);
  const total = cart.subtotal + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Find your next favourite kit.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Cart</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-3">
          {cart.items.map((it) => (
            <div key={`${it.productId}-${it.variantId}`} className="flex gap-4 rounded-2xl border border-border bg-card p-3">
              <Link to="/product/$slug" params={{ slug: it.slug }} className="size-24 shrink-0 overflow-hidden rounded-lg bg-secondary/40">
                <img src={it.image} alt={it.name} className="size-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to="/product/$slug" params={{ slug: it.slug }} className="font-semibold line-clamp-2 hover:text-primary">{it.name}</Link>
                {it.variantLabel && <div className="text-xs text-muted-foreground mt-0.5">{it.variantLabel}</div>}
                <div className="mt-2 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button onClick={() => cart.setQty(it.productId, it.variantId, it.quantity - 1)} className="p-2"><Minus className="size-3" /></button>
                    <span className="px-3 text-sm font-medium">{it.quantity}</span>
                    <button onClick={() => cart.setQty(it.productId, it.variantId, it.quantity + 1)} className="p-2"><Plus className="size-3" /></button>
                  </div>
                  <button onClick={() => cart.remove(it.productId, it.variantId)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <div className="text-right font-bold">{inr(it.price * it.quantity)}</div>
            </div>
          ))}
        </div>
        <aside className="rounded-2xl border border-border bg-card p-6 h-fit sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <dl className="space-y-2 text-sm">
            <Row k="Subtotal" v={inr(cart.subtotal)} />
            <Row k="Shipping" v={shipping === 0 ? "Free" : inr(shipping)} />
            <Row k="Tax (5% GST)" v={inr(tax)} />
            <div className="border-t border-border my-3" />
            <Row k="Total" v={inr(total)} bold />
          </dl>
          <button onClick={() => navigate({ to: "/checkout" })} className="mt-6 w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground glow-primary hover:bg-primary/90">
            Proceed to Checkout
          </button>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-bold" : ""}`}>
      <dt>{k}</dt><dd>{v}</dd>
    </div>
  );
}
