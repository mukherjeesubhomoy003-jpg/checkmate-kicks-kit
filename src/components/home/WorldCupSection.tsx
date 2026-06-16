import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Sparkles, ShoppingBag } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import banner from "@/assets/wc-banner.jpg.asset.json";
import { JERSEYS, type Jersey } from "@/lib/jerseys";
import { useJerseyStock } from "@/lib/jersey-stock";

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
  const { data: stockMap } = useJerseyStock();
  const list = preview ? JERSEYS.slice(0, preview) : JERSEYS;

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

          <div className="mt-5 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Home</span> <span className="text-neutral-500">₹1000</span></div>
            <div className="h-4 w-px bg-gold/40" />
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Away</span> <span className="text-neutral-500">₹1100</span></div>
          </div>
          <div className="mt-5 h-px w-24 hairline-gold" />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {list.map((j) => {
            const stock = stockMap?.[j.id];
            const out = stock === 0;
            const low = typeof stock === "number" && stock > 0 && stock <= 3;
            return (
            <article key={j.id} className="group relative overflow-hidden rounded-xl bg-white shadow-luxe transition hover:-translate-y-0.5" style={{ border: "1px solid #ecdcae" }}>
              <div className="absolute right-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", boxShadow: "0 4px 10px -6px rgba(184,134,43,0.6)" }}>
                <Sparkles className="size-2.5" /> Player
              </div>
              {out && (
                <div className="absolute left-1.5 top-1.5 z-10 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white">
                  Sold out
                </div>
              )}
              {low && (
                <div className="absolute left-1.5 top-1.5 z-10 rounded-full bg-amber-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white">
                  Only {stock} left
                </div>
              )}

              <button onClick={() => !out && setActive(j)} disabled={out} className="block w-full disabled:cursor-not-allowed" aria-label={`Order ${j.team}`}>
                <div className={`aspect-[4/5] w-full overflow-hidden bg-gold-soft ${out ? "opacity-60" : ""}`}>
                  <img src={j.image} alt={`${j.team} ${j.tag} jersey`} loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              </button>

              <div className="px-2.5 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">{j.tag} · 2026</div>
                  <div className="text-[8px] font-mono text-neutral-400">#{j.id}</div>
                </div>
                <div className="mt-0.5 font-display text-sm font-semibold text-neutral-900 truncate">{j.team}</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11px] text-[#8a6a14] font-bold">₹{j.tag === "Home" ? 1000 : 1100}</div>
                  <button onClick={() => !out && setActive(j)} disabled={out}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37" }}>
                    <ShoppingBag className="size-2.5" /> {out ? "Sold" : "Order"}
                  </button>
                </div>
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
        onClose={() => setActive(null)}
      />
    </section>
  );
}
