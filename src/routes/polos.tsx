import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy, ShoppingCart } from "lucide-react";
import { POLOS, POLO_PRICE, POLO_MRP, type Polo } from "@/lib/polos";
import { OrderModal } from "@/components/order/OrderModal";
import { OrderGuide } from "@/components/OrderGuide";
import { AddToCartModal } from "@/components/AddToCartModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import { useBulkCart } from "@/lib/bulk-cart";
import { toast } from "sonner";
import polosBanner from "@/assets/banners/polos.jpg.asset.json";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/polos")({
  head: () => ({
    meta: [
      { title: "Polo T-Shirts — CHECKMATE" },
      { name: "description", content: "Premium football polo t-shirts. Germany, Spain, Arsenal, France, Portugal, Al Nassr & more. ₹1200 flat. Free all-India shipping." },
      { property: "og:title", content: "CHECKMATE — Polo T-Shirt Collection" },
      { property: "og:description", content: "All football polos ₹1200 · Free shipping across India." },
    ],
  }),
  component: PolosPage,
});

function PolosPage() {
  const [active, setActive] = useState<Polo | null>(null);
  const [addingTo, setAddingTo] = useState<Polo | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();
  const list = POLOS.filter((p) => {
    const t = totalStock(stockMap, p.id);
    return t === undefined || t > 0;
  });

  return (
    <div>
      <div className="relative w-full overflow-hidden" style={{ backgroundImage: `url(${polosBanner.url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="bg-gradient-to-r from-black/85 via-black/60 to-black/30">
          <div className="container-x py-10 md:py-16">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-white/10 backdrop-blur text-white hover:bg-[#fa5400] transition">
              <ArrowLeft className="size-3.5" /> Back
            </Link>
            <div className="mt-6 max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Trophy className="size-3.5" /> {list.length} Polo T-Shirts Live
              </div>
              <h1 className="mt-4 font-bebas text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
                Polo <span className="text-[#fa5400]">T-Shirts.</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-lg">
                Premium club & country polos · <b className="text-[#fa5400]">₹{POLO_PRICE} flat</b> · Free all-India shipping.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/bulk-cart" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#F1BF00] transition">
                  <ShoppingCart className="size-3.5" /> View Cart {cart.count > 0 && `· ${cart.count}`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-x py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {list.map((p) => {
                const total = totalStock(stockMap, p.id);
                const low = typeof total === "number" && total > 0 && total <= 3;
                return (
                  <article key={p.id} className="group relative bg-[#f5f5f5] flex flex-col">
                    <div className="relative overflow-hidden bg-[#f5f5f5] cursor-pointer" onClick={() => setActive(p)}>
                      <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                        Polo
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <img src={p.image} alt={`${p.team} ${p.tag} polo t-shirt`} loading="lazy" decoding="async"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">{p.tag}</div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">{p.team}</h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{POLO_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{POLO_MRP}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddingTo(p)}
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
        team={active ? `${active.team} — ${active.tag} Polo` : ""}
        image={active?.image ?? ""}
        priceOverride={POLO_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        category="Polo"
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          item={{
            id: addingTo.id,
            title: `${addingTo.team} · ${addingTo.tag}`,
            image: addingTo.image,
            price: POLO_PRICE,
            mrp: POLO_MRP,
            category: "Polo",
          }}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={({ size, qty, name, itemId }) => {
            cart.add({
              itemId,
              name: `${name} · Polo`,
              image: addingTo.image,
              price: POLO_PRICE,
              size,
              quantity: qty,
              category: "Polo",
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
