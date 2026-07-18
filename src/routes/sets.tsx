import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { SETS, SETS_PRICE, SETS_MRP, type SetItem } from "@/lib/sets";
import { OrderModal } from "@/components/order/OrderModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import setsBanner from "@/assets/banners/sets.jpg.asset.json";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/sets")({
  head: () => ({
    meta: [
      { title: "1st Grade Sets — Jersey + Shorts · CHECKMATE" },
      { name: "description", content: "Premium 1st Grade football sets — jersey + shorts kit combos at ₹699. Real Madrid, Barcelona, Manchester United, Liverpool, AC Milan, Arsenal, Japan and more." },
      { property: "og:title", content: "CHECKMATE — 1st Grade Sets" },
      { property: "og:description", content: "Complete kit sets · Jersey + Shorts · ₹699 · All-India delivery." },
    ],
  }),
  component: SetsPage,
});

function SetsPage() {
  const [active, setActive] = useState<SetItem | null>(null);
  const { data: stockMap } = useJerseySizeStock();

  const list = SETS.filter((s) => {
    const t = totalStock(stockMap, s.id);
    return t === undefined || t > 0;
  });

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundImage: `url(${setsBanner.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="bg-gradient-to-r from-black/85 via-black/60 to-black/30">
          <div className="container-x py-10 md:py-16">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-white/10 backdrop-blur text-white hover:bg-[#fa5400] transition">
              <ArrowLeft className="size-3.5" /> Back
            </Link>
            <div className="mt-6 max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Trophy className="size-3.5" /> 1st Grade · {list.length} Sets Live
              </div>
              <h1 className="mt-4 font-bebas text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
                1<span className="text-[#fa5400]">st</span> Grade <span className="text-[#fa5400]">Sets.</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-lg">
                Complete kit combos — <b>Jersey + Shorts</b>. Premium 1st-grade fabric, club & country editions.
                Flat <b className="text-[#fa5400]">₹{SETS_PRICE}</b> · MRP <span className="line-through opacity-70">₹{SETS_MRP}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="container-x py-10 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
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
                  <div className="absolute right-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    Set
                  </div>
                  {low && (
                    <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  )}
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={s.image}
                      alt={`${s.team} ${s.tag} kit set`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-1 pt-2 pb-3 md:pt-3 md:pb-4">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                    1st Grade Set
                  </div>
                  <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                    {s.team} · {s.tag}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{SETS_PRICE}</span>
                    <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{SETS_MRP}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Jersey + Shorts · All-India delivery · 7 days
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} · ${active.tag} (Set)` : ""}
        image={active?.image ?? ""}
        priceOverride={SETS_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
