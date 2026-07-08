import { useState } from "react";
import { Trophy } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import { JERSEYS, type Jersey } from "@/lib/jerseys";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

type Props = {
  preview?: number;
  showBanner?: boolean;
  heading?: string;
};

export function WorldCupSection({ preview, showBanner: _showBanner = true, heading }: Props) {
  const [active, setActive] = useState<Jersey | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const available = JERSEYS.filter((j) => {
    const t = totalStock(stockMap, j.id);
    return t === undefined || t > 0;
  });
  const list = preview ? available.slice(0, preview) : available;

  return (
    <section className="relative bg-white" id="collection">
      <div className="container-x relative py-12 md:py-20 text-neutral-900">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
            <Trophy className="size-3.5" /> {preview ? `Featured · ${preview} of ${JERSEYS.length}` : `${JERSEYS.length} Player-Edition Jerseys`}
          </div>

          <h2 className="mt-4 font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight uppercase text-black">
            {heading ?? "World Cup"} <span className="text-[#fa5400]">Collection.</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs md:text-sm text-neutral-600 px-4">
            Match-grade fabric · federation badges · heat-pressed numbers · <b>₹850 flat</b>.
          </p>
        </div>

        <div id="jersey-grid" className="mt-8 md:mt-10 scroll-mt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {list.map((j) => {
            const total = totalStock(stockMap, j.id);
            const out = total === 0;
            const low = typeof total === "number" && total > 0 && total <= 3;
            const price = 850;
            const mrp = 1999;
            return (
              <article
                key={j.id}
                className={`group relative bg-[#f5f5f5] ${out ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !out && setActive(j)}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  {out && (
                    <div className="absolute left-1.5 top-1.5 md:left-2 md:top-2 z-10 bg-black px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Sold out
                    </div>
                  )}
                  {low && (
                    <div className="absolute left-1.5 top-1.5 md:left-2 md:top-2 z-10 bg-[#fa5400] px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  )}
                  <div className="absolute right-1.5 top-1.5 md:right-2 md:top-2 z-10 bg-black px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    -50%
                  </div>
                  <div className={`aspect-[4/5] w-full ${out ? "opacity-40" : ""}`}>
                    <img
                      src={j.image}
                      alt={`${j.team} ${j.tag} player edition jersey`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-1 pt-2 pb-3 md:pt-3 md:pb-4">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                    Player Edition
                  </div>
                  <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                    {j.team} {j.tag}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                    <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{price}</span>
                    <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{mrp}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500 px-4">
          Free shipping · All-India delivery · 7 days
        </div>
      </div>

      <OrderModal
        open={!!active}
        team={active?.team ?? ""}
        image={active?.image ?? ""}
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
