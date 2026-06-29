import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import banner from "@/assets/wc-banner.jpg.asset.json";
import { JERSEYS, type Jersey } from "@/lib/jerseys";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

type Props = {
  /** Show only the first N jerseys, with an "Explore more" CTA. */
  preview?: number;
  /** Hide top banner (used on the dedicated page where banner is its own hero). */
  showBanner?: boolean;
  /** Heading text override. */
  heading?: string;
};

export function WorldCupSection({ preview, showBanner = true, heading }: Props) {
  const [active, setActive] = useState<Jersey | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  // Hide jerseys that are explicitly sold out (total stock == 0).
  // Jerseys with unknown stock (no row yet) stay visible.
  const available = JERSEYS.filter((j) => {
    const t = totalStock(stockMap, j.id);
    return t === undefined || t > 0;
  });
  const list = preview ? available.slice(0, preview) : available;


  return (
    <section className="relative overflow-hidden" id="collection">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbf7ee] to-white" />
      <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 70%, #b8862b 0, transparent 45%)",
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-16 md:py-24 text-neutral-900">
        {showBanner && (
          <div className="relative mb-12 overflow-hidden rounded-2xl shadow-luxe" style={{ border: "1px solid #e6c976" }}>
            <img src={banner.url} alt="Checkmate Player Edition World Cup 2026" loading="lazy"
                 className="w-full h-[180px] md:h-[280px] object-cover" />
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", color: "#8a6a14", border: "1px solid #e6c976", boxShadow: "0 1px 0 #ffffff inset, 0 8px 24px -12px rgba(184,134,43,0.45)" }}>
            <Trophy className="size-3.5" /> {preview ? `Featured · ${preview} of ${JERSEYS.length}` : `${JERSEYS.length} Player-Edition Jerseys`}
          </div>

          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#1a1a1a 0%,#1a1a1a 55%,#8a6a14 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {heading ?? "World Cup"}
            </span>{" "}
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Collection 2026
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-600">
            {preview
              ? "A taste of our drop — tap Explore for the complete catalogue."
              : "The complete player-edition catalogue — match-grade fabric, federation badges, heat-pressed numbers."}
          </p>

          <div className="mt-5 h-px w-24 hairline-gold" />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {list.map((j) => {
            const total = totalStock(stockMap, j.id);
            const out = total === 0;
            const low = typeof total === "number" && total > 0 && total <= 3;
            const price = j.tag === "Away" && j.team === "Portugal" ? 1299 : j.tag === "Away" ? 1100 : 1000;
            return (
            <article key={j.id} className="group relative cursor-pointer" onClick={() => !out && setActive(j)}>
              <div className="relative overflow-hidden rounded-md bg-[#f1f1f1]">
                {out && (
                  <div className="absolute left-2 top-2 z-10 rounded-sm bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Sold out
                  </div>
                )}
                {low && (
                  <div className="absolute left-2 top-2 z-10 rounded-sm bg-[#d4af37] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                    Only {total} left
                  </div>
                )}
                {!out && !low && typeof total === "number" && (
                  <div className="absolute left-2 top-2 z-10 rounded-sm bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
                    {total} in stock
                  </div>
                )}
                <div className={`aspect-[4/5] w-full overflow-hidden ${out ? "opacity-50" : ""}`}>
                  <img src={j.image} alt={`${j.team} ${j.tag} jersey`} loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
              </div>
              <div className="pt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-display text-[15px] font-semibold text-neutral-900 leading-tight truncate">{j.team}</div>
                  <div className="mt-0.5 text-[12px] text-neutral-500">{j.tag} · Player Edition</div>
                </div>
                <div className="text-[14px] font-bold text-neutral-900 whitespace-nowrap">₹{price}</div>
              </div>
            </article>
          );})}

        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          {preview && (
            <Link to="/world-cup-2026"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 18px 40px -16px rgba(184,134,43,0.8)" }}>
              Explore all {JERSEYS.length} jerseys <ArrowRight className="size-4" />
            </Link>
          )}
          <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 text-center px-4">
            Free shipping · All-India delivery · Delivered to your doorstep within 7 days
          </div>
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
