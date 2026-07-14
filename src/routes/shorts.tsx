import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { SHORTS, SHORTS_PRICE, SHORTS_SHIPPING, SHORTS_MRP, type Short } from "@/lib/shorts";
import { OrderModal } from "@/components/order/OrderModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/shorts")({
  head: () => ({
    meta: [
      { title: "Football Shorts — CHECKMATE" },
      { name: "description", content: "Match-grade football shorts. Portugal, Brasil, France, Argentina, Germany & more. ₹250 + ₹50 shipping." },
      { property: "og:title", content: "CHECKMATE — Football Shorts" },
      { property: "og:description", content: "Club & country shorts · ₹250 + ₹50 shipping · All-India delivery." },
    ],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  const [active, setActive] = useState<Short | null>(null);
  const { data: stockMap } = useJerseySizeStock();

  const list = SHORTS.filter((s) => {
    const t = totalStock(stockMap, s.id);
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
            <Trophy className="size-3.5" /> {list.length} Football Shorts
          </div>
          <h1 className="mt-4 font-bebas text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
            Football <span className="text-[#fa5400]">Shorts.</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-600">
            Match-grade fabric · Club & country editions · <b>₹{SHORTS_PRICE}</b> + <b>₹{SHORTS_SHIPPING}</b> shipping.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {list.map((s) => {
            const total = totalStock(stockMap, s.id);
            const low = typeof total === "number" && total > 0 && total <= 3;
            return (
              <article
                key={s.id}
                className="group relative bg-[#f5f5f5] cursor-pointer"
                onClick={() => setActive(s)}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    Shorts
                  </div>
                  {low && (
                    <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  )}
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={s.image}
                      alt={`${s.team} ${s.colour} football shorts`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-1 pt-2 pb-3 md:pt-3 md:pb-4">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                    Football Shorts
                  </div>
                  <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                    {s.team} · {s.colour}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{SHORTS_PRICE}</span>
                    <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{SHORTS_MRP}</span>
                    <span className="text-[9px] md:text-[10px] text-neutral-500">+₹{SHORTS_SHIPPING} ship</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          ₹{SHORTS_SHIPPING} shipping · All-India delivery · 7 days
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} · ${active.colour} Shorts` : ""}
        image={active?.image ?? ""}
        priceOverride={SHORTS_PRICE}
        shippingOverride={SHORTS_SHIPPING}
        hideKitSelector
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
