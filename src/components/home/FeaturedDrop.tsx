import { useState } from "react";
import { Flame, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import { SPECIALS, type Special } from "@/lib/specials";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export function FeaturedDrop() {
  const [active, setActive] = useState<Special | null>(null);
  const { data: stockMap } = useJerseySizeStock();

  // Hide sold-out (explicit zero). Unmanaged (no row) stays visible.
  const list = SPECIALS.filter((d) => {
    const t = totalStock(stockMap, d.id);
    return t === undefined || t > 0;
  });

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="container-x relative py-12 md:py-20">
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-[#fa5400] text-white">
            <Flame className="size-3.5" /> Special Drops · Limited Stock
          </div>
          <h2 className="mt-4 font-bebas text-3xl sm:text-5xl md:text-7xl leading-[0.9] tracking-tight uppercase text-white">
            Player Version
            <br />
            <span className="text-[#fa5400]">Special Editions.</span>
          </h2>
          <p className="mt-2 max-w-xl text-xs md:text-sm text-neutral-300">
            Authentic player-version drops — full-sleeve editions, pre-match kits, and exclusive PV colourways.
          </p>
        </div>

        <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((d) => {
            const total = totalStock(stockMap, d.id);
            const low = typeof total === "number" && total > 0 && total <= 3;
            // available sizes (respecting per-drop `sizes` and stock-per-size)
            const availableSizes = d.sizes.filter((s) => {
              const st = stockMap?.[d.id]?.[s as SizeKey];
              return st === undefined || st > 0;
            });
            return (
              <button
                key={d.key}
                onClick={() => setActive({ ...d, sizes: availableSizes.length ? availableSizes : d.sizes })}
                className="group text-left bg-[#f5f5f5] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute left-1.5 top-1.5 md:left-2 md:top-2 z-10 bg-[#fa5400] px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    {d.eyebrow}
                  </div>
                  {low && (
                    <div className="absolute left-1.5 bottom-1.5 md:left-2 md:bottom-2 z-10 bg-black px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  )}
                  {d.badge && (
                    <div className="absolute right-1.5 top-1.5 md:right-2 md:top-2 z-10 bg-black px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      {d.badge}
                    </div>
                  )}
                  <div className="aspect-[4/5] w-full bg-[#f5f5f5]">
                    <img
                      src={d.image}
                      alt={d.team}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 md:px-3 md:pt-3 md:pb-4">
                  <div className="hidden md:flex items-center gap-1 text-[#fa5400]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3 fill-current" />
                    ))}
                  </div>
                  <h3 className="mt-0.5 md:mt-1 font-bebas text-lg md:text-2xl uppercase tracking-wide text-black leading-tight line-clamp-2">
                    {d.title}
                  </h3>
                  <div className="mt-0.5 text-[10px] md:text-[11px] text-neutral-500 uppercase tracking-wider line-clamp-1">
                    {d.subtitle}
                  </div>
                  <div className="mt-1.5 md:mt-2 flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                    <span className="font-bebas text-xl md:text-3xl tracking-wide text-black">₹{d.price}</span>
                    <span className="text-[10px] md:text-[11px] text-neutral-500 line-through">₹{d.mrp}</span>
                  </div>
                  <div className="mt-2 md:mt-3 inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] md:tracking-[0.2em] bg-black text-white group-hover:bg-[#fa5400] transition-colors">
                    <ShoppingBag className="size-3 md:size-3.5" /> Order
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <OrderModal
        open={!!active}
        team={active?.team ?? ""}
        image={active?.image ?? ""}
        priceOverride={active?.price}
        sizesOverride={active?.sizes}
        jerseyId={active?.id}
        hideKitSelector
        onClose={() => setActive(null)}
      />
    </section>
  );
}
