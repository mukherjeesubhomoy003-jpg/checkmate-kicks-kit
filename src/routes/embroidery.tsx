import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Trophy, Flame } from "lucide-react";
import { EMBROIDERY, EMBROIDERY_PRICE, EMBROIDERY_MRP, type Embroidery } from "@/lib/embroidery";
import { OrderModal } from "@/components/order/OrderModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/embroidery")({
  head: () => ({
    meta: [
      { title: "Embroidery Edition — Real Madrid 26/27 · CHECKMATE" },
      { name: "description", content: "Upcoming season embroidery jersey — Real Madrid 26/27 Home edition. Premium stitched crest & sponsor. Only ₹499." },
      { property: "og:title", content: "CHECKMATE — Embroidery Editions" },
      { property: "og:description", content: "Real Madrid 26/27 Embroidery — ₹499 only. Upcoming season drop." },
    ],
  }),
  component: EmbroideryPage,
});

function EmbroideryPage() {
  const [active, setActive] = useState<Embroidery | null>(null);
  const { data: stockMap } = useJerseySizeStock();

  return (
    <div className="bg-white">
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#F1BF00] hover:text-black transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a0a2e] text-white">
        <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 40%, rgba(241,191,0,0.35), transparent 55%)" }} />
        <div className="container-x relative py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 border border-[#F1BF00]/60 bg-[#F1BF00]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F1BF00]">
            <Sparkles className="size-3.5" /> New · Upcoming Season Drop
          </div>
          <h1 className="mt-5 font-bebas text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
            Embroidery <span className="bg-gradient-to-r from-[#F1BF00] via-white to-[#F1BF00] bg-clip-text text-transparent">Edition.</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base text-zinc-300">
            Real Madrid <b className="text-white">26/27 Home</b> — stitched crest, embroidered sponsor, match-day feel.
            <br />
            <span className="text-[#F1BF00] font-bold">₹{EMBROIDERY_PRICE} only</span> · Launch price · Limited units.
          </p>
        </div>
      </section>

      <section className="container-x py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {EMBROIDERY.map((p) => {
            const total = totalStock(stockMap, p.id);
            const low = typeof total === "number" && total > 0 && total <= 3;
            const soldOut = total === 0;
            return (
              <article
                key={p.id}
                className={`group relative bg-[#f5f5f5] ${soldOut ? "opacity-70" : "cursor-pointer"}`}
                onClick={() => !soldOut && setActive(p)}
              >
                <div className="relative overflow-hidden bg-[#f5f5f5]">
                  <div className="absolute right-2 top-2 z-10 bg-[#F1BF00] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-black inline-flex items-center gap-1">
                    <Sparkles className="size-3" /> Embroidery
                  </div>
                  {soldOut ? (
                    <div className="absolute left-2 top-2 z-10 bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Sold out</div>
                  ) : low ? (
                    <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Only {total} left
                    </div>
                  ) : (
                    <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F1BF00] inline-flex items-center gap-1">
                      <Flame className="size-3" /> New
                    </div>
                  )}
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={p.image}
                      alt={`${p.team} ${p.season} embroidery jersey`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="px-2 pt-3 pb-4">
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.16em] text-[#F1BF00]">{p.season}</div>
                  <h3 className="mt-0.5 font-bebas text-lg md:text-2xl leading-tight tracking-wide uppercase text-black">
                    {p.team}
                  </h3>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">{p.tag}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-bebas text-xl tracking-wide text-black">₹{EMBROIDERY_PRICE}</span>
                    <span className="text-[11px] text-neutral-400 line-through">₹{EMBROIDERY_MRP}</span>
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#AA151B]">-67%</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          <Trophy className="inline size-3.5 mr-1 text-[#F1BF00]" />
          Free shipping · All-India delivery · Launch pricing
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} ${active.season} Embroidery` : ""}
        image={active?.image ?? ""}
        priceOverride={EMBROIDERY_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
