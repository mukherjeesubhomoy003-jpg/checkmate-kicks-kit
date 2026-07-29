import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy, ShoppingCart } from "lucide-react";
import { FAN_FS, FAN_FS_PRICE, FAN_FS_MRP, type FanFs } from "@/lib/fan-fs";
import { OrderModal } from "@/components/order/OrderModal";
import { OrderGuide } from "@/components/OrderGuide";
import { AddToCartModal } from "@/components/AddToCartModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import { useBulkCart } from "@/lib/bulk-cart";
import { toast } from "sonner";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/fan-fs")({
  head: () => ({
    meta: [
      { title: "Fan Version Full Sleeve — CHECKMATE" },
      { name: "description", content: "Fan Version Full Sleeve club editions — Juventus, Arsenal, Liverpool, Man United, Real Madrid & Barcelona. ₹950 flat. Free shipping." },
      { property: "og:title", content: "CHECKMATE — Fan Full Sleeve Club Edition" },
      { property: "og:description", content: "Full-sleeve fan version club kits · ₹950 · Free all-India shipping." },
    ],
  }),
  component: FanFsPage,
});

function FanFsPage() {
  const [active, setActive] = useState<FanFs | null>(null);
  const [addingTo, setAddingTo] = useState<FanFs | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();
  const list = FAN_FS.filter((j) => {
    const t = totalStock(stockMap, j.id);
    return t === undefined || t > 0;
  });

  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#fa5400] transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>

      <section className="container-x py-10 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
            <Trophy className="size-3.5" /> {list.length} Full Sleeve Kits
          </div>
          <h1 className="mt-4 font-bebas text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
            Fan Version <span className="text-[#fa5400]">Full Sleeve.</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-600">
            Long-sleeve club edition supporter kits · <b>₹{FAN_FS_PRICE}</b> flat · Free all-India shipping.
          </p>
          <Link to="/bulk-cart" className="mt-4 inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#fa5400] transition">
            <ShoppingCart className="size-3.5" /> View Cart {cart.count > 0 && `· ${cart.count}`}
          </Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {list.map((j) => {
                const total = totalStock(stockMap, j.id);
                const low = typeof total === "number" && total > 0 && total <= 3;
                return (
                  <article key={j.id} className="group relative bg-[#f5f5f5] flex flex-col">
                    <div className="relative overflow-hidden bg-[#f5f5f5] cursor-pointer" onClick={() => setActive(j)}>
                      <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                        Full Sleeve
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <img src={j.image} alt={`${j.team} ${j.tag} full sleeve fan jersey`} loading="lazy" decoding="async"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">Fan · Full Sleeve</div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                        {j.team} · {j.tag}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{FAN_FS_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{FAN_FS_MRP}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddingTo(j)}
                      className="mx-1 mb-2 md:mb-3 inline-flex items-center justify-center gap-1.5 bg-black text-white px-2 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#fa5400] transition"
                    >
                      <ShoppingCart className="size-3.5" /> Add to Cart
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Free shipping · All-India delivery · 7 days
            </div>
          </div>

          <div className="hidden lg:block">
            <OrderGuide />
          </div>
        </div>

        <div className="lg:hidden mt-12 border-t border-black/10 pt-8">
          <OrderGuide />
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} · ${active.tag} · Fan Full Sleeve` : ""}
        image={active?.image ?? ""}
        priceOverride={FAN_FS_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        category="Fan FS"
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          item={{
            id: addingTo.id,
            title: `${addingTo.team} · ${addingTo.tag}`,
            image: addingTo.image,
            price: FAN_FS_PRICE,
            mrp: FAN_FS_MRP,
            category: "Fan FS",
          }}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={({ size, qty, name, itemId }) => {
            cart.add({
              itemId,
              name: `${name} · Fan Full Sleeve`,
              image: addingTo.image,
              price: FAN_FS_PRICE,
              size,
              quantity: qty,
              category: "Fan FS",
            });
            toast.success(`Added to cart: ${name} · ${size} × ${qty}`, {
              action: { label: "View Cart", onClick: () => { window.location.href = "/bulk-cart"; } },
            });
            setAddingTo(null);
          }}
        />
      )}
    </div>
  );
}
