import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { POLOS, POLO_PRICE, POLO_MRP, type Polo } from "@/lib/polos";
import { OrderModal } from "@/components/order/OrderModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

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
  const { data: stockMap } = useJerseySizeStock();
  const list = POLOS.filter((p) => {
    const t = totalStock(stockMap, p.id);
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
            <Trophy className="size-3.5" /> {list.length} Polo T-Shirts
          </div>
          <h1 className="mt-4 font-bebas text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
            Polo <span className="text-[#fa5400]">T-Shirts.</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-600">
            Premium club & country polos · <b>₹{POLO_PRICE} flat</b> · Free all-India shipping.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {list.map((p) => {
            const total = totalStock(stockMap, p.id);
            const low = typeof total === "number" && total > 0 && total <= 3;
            return (
              <article
                key={p.id}
                className="group relative bg-[#f5f5f5] cursor-pointer"
                onClick={() => setActive(p)}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    Polo
                  </div>
                  {low && (
                    <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  )}
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={p.image}
                      alt={`${p.team} ${p.tag} polo t-shirt`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-1 pt-2 pb-3 md:pt-3 md:pb-4">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                    {p.tag}
                  </div>
                  <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                    {p.team}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{POLO_PRICE}</span>
                    <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{POLO_MRP}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Free shipping · All-India delivery · 7 days
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} — ${active.tag} Polo` : ""}
        image={active?.image ?? ""}
        priceOverride={POLO_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
