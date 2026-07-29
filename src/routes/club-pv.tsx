import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy, ShoppingCart, Flame } from "lucide-react";
import { CLUB_PV, CLUB_PV_PRICE, CLUB_PV_MRP, type ClubPv } from "@/lib/club-pv";
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

export const Route = createFileRoute("/club-pv")({
  head: () => ({
    meta: [
      { title: "Club Edition Player Version 25/26 — CHECKMATE" },
      { name: "description", content: "Upcoming Club Edition Player Version jerseys — Real Madrid, Barcelona, Arsenal, City, Bayern, Milan & more. ₹899 flat. Hurry — limited stock." },
      { property: "og:title", content: "CHECKMATE — Club Edition Player Version" },
      { property: "og:description", content: "Upcoming club 25/26 player version drops · ₹899 · Limited stock." },
    ],
  }),
  component: ClubPvPage,
});

function ClubPvPage() {
  const [active, setActive] = useState<ClubPv | null>(null);
  const [addingTo, setAddingTo] = useState<ClubPv | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();
  const list = CLUB_PV.filter((j) => {
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

      {/* Upcoming banner */}
      <section className="container-x mt-5">
        <div className="relative overflow-hidden bg-gradient-to-r from-black via-[#1a0a2e] to-black text-white px-5 py-6 sm:px-8 sm:py-8 border border-[#fa5400]/40">
          <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 50%, rgba(250,84,0,0.6), transparent 55%)" }} />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F1BF00]">
                <Flame className="size-3.5" /> Upcoming Club Edition · 25/26
              </div>
              <h2 className="mt-2 font-bebas text-3xl sm:text-5xl uppercase leading-none tracking-tight">
                Hurry Up — <span className="text-[#fa5400]">Limited Stock.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl">
                First-lot upcoming season Player Version drops from the biggest clubs. Match-grade fabric, ₹{CLUB_PV_PRICE} flat, no shipping.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bebas text-4xl sm:text-5xl text-[#F1BF00] leading-none">₹{CLUB_PV_PRICE}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/70 mt-1">No shipping</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-10 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
            <Trophy className="size-3.5" /> {list.length} Club Edition Player Kits
          </div>
          <h1 className="mt-4 font-bebas text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
            Club Edition <span className="text-[#fa5400]">Player Version.</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-600">
            25/26 upcoming club drops · Match-grade · <b>₹{CLUB_PV_PRICE}</b> flat · No shipping.
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
                        Club · 25/26
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <img src={j.image} alt={`${j.team} ${j.tag} club edition player version jersey`} loading="lazy" decoding="async"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">Club Edition · Player</div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                        {j.team} · {j.tag}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{CLUB_PV_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{CLUB_PV_MRP}</span>
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
              No shipping charge · All-India delivery · 7 days
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
        team={active ? `${active.team} · ${active.tag} · Club Edition` : ""}
        image={active?.image ?? ""}
        priceOverride={CLUB_PV_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        category="Club PV"
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          item={{
            id: addingTo.id,
            title: `${addingTo.team} · ${addingTo.tag}`,
            image: addingTo.image,
            price: CLUB_PV_PRICE,
            mrp: CLUB_PV_MRP,
            category: "Club PV",
          }}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={({ size, qty, name, itemId }) => {
            cart.add({
              itemId,
              name: `${name} · Club Edition PV`,
              image: addingTo.image,
              price: CLUB_PV_PRICE,
              size,
              quantity: qty,
              category: "Club PV",
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
