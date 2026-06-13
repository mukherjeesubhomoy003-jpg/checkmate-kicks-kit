import { useState } from "react";
import { ArrowRight, Trophy, Sparkles, ShoppingBag } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import banner from "@/assets/wc-banner.jpg.asset.json";

// Auto-import all 46 jerseys
import j01 from "@/assets/jerseys/j01.jpg.asset.json";
import j02 from "@/assets/jerseys/j02.jpg.asset.json";
import j03 from "@/assets/jerseys/j03.jpg.asset.json";
import j04 from "@/assets/jerseys/j04.jpg.asset.json";
import j05 from "@/assets/jerseys/j05.jpg.asset.json";
import j06 from "@/assets/jerseys/j06.jpg.asset.json";
import j07 from "@/assets/jerseys/j07.jpg.asset.json";
import j08 from "@/assets/jerseys/j08.jpg.asset.json";
import j09 from "@/assets/jerseys/j09.jpg.asset.json";
import j10 from "@/assets/jerseys/j10.jpg.asset.json";
import j11 from "@/assets/jerseys/j11.jpg.asset.json";
import j12 from "@/assets/jerseys/j12.jpg.asset.json";
import j13 from "@/assets/jerseys/j13.jpg.asset.json";
import j14 from "@/assets/jerseys/j14.jpg.asset.json";
import j15 from "@/assets/jerseys/j15.jpg.asset.json";
import j16 from "@/assets/jerseys/j16.jpg.asset.json";
import j17 from "@/assets/jerseys/j17.jpg.asset.json";
import j18 from "@/assets/jerseys/j18.jpg.asset.json";
import j19 from "@/assets/jerseys/j19.jpg.asset.json";
import j20 from "@/assets/jerseys/j20.jpg.asset.json";
import j21 from "@/assets/jerseys/j21.jpg.asset.json";
import j22 from "@/assets/jerseys/j22.jpg.asset.json";
import j23 from "@/assets/jerseys/j23.jpg.asset.json";
import j24 from "@/assets/jerseys/j24.jpg.asset.json";
import j25 from "@/assets/jerseys/j25.jpg.asset.json";
import j26 from "@/assets/jerseys/j26.jpg.asset.json";
import j27 from "@/assets/jerseys/j27.jpg.asset.json";
import j28 from "@/assets/jerseys/j28.jpg.asset.json";
import j29 from "@/assets/jerseys/j29.jpg.asset.json";
import j30 from "@/assets/jerseys/j30.jpg.asset.json";
import j31 from "@/assets/jerseys/j31.jpg.asset.json";
import j32 from "@/assets/jerseys/j32.jpg.asset.json";
import j33 from "@/assets/jerseys/j33.jpg.asset.json";
import j34 from "@/assets/jerseys/j34.jpg.asset.json";
import j35 from "@/assets/jerseys/j35.jpg.asset.json";
import j36 from "@/assets/jerseys/j36.jpg.asset.json";
import j37 from "@/assets/jerseys/j37.jpg.asset.json";
import j38 from "@/assets/jerseys/j38.jpg.asset.json";
import j39 from "@/assets/jerseys/j39.jpg.asset.json";
import j40 from "@/assets/jerseys/j40.jpg.asset.json";
import j41 from "@/assets/jerseys/j41.jpg.asset.json";
import j42 from "@/assets/jerseys/j42.jpg.asset.json";
import j43 from "@/assets/jerseys/j43.jpg.asset.json";
import j44 from "@/assets/jerseys/j44.jpg.asset.json";
import j45 from "@/assets/jerseys/j45.jpg.asset.json";
import j46 from "@/assets/jerseys/j46.jpg.asset.json";

type Jersey = { id: string; team: string; tag: "Home" | "Away"; image: string };

// Team names known from the source — others labelled by edition number.
const RAW: [string, "Home" | "Away", string][] = [
  ["Player Edition 01", "Home", j01.url],
  ["Player Edition 02", "Home", j02.url],
  ["Player Edition 03", "Away", j03.url],
  ["Climacool '09 Retro", "Home", j04.url],
  ["Player Edition 05", "Home", j05.url],
  ["Player Edition 06", "Away", j06.url],
  ["Player Edition 07", "Home", j07.url],
  ["Player Edition 08", "Away", j08.url],
  ["England", "Home", j09.url],
  ["Italy", "Home", j10.url],
  ["Player Edition 11", "Home", j11.url],
  ["Player Edition 12", "Away", j12.url],
  ["Player Edition 13", "Home", j13.url],
  ["Player Edition 14", "Away", j14.url],
  ["Brasil", "Home", j15.url],
  ["Player Edition 16", "Away", j16.url],
  ["Player Edition 17", "Home", j17.url],
  ["Player Edition 18", "Away", j18.url],
  ["England", "Away", j19.url],
  ["Player Edition 20", "Home", j20.url],
  ["Player Edition 21", "Away", j21.url],
  ["Player Edition 22", "Home", j22.url],
  ["Japan", "Home", j23.url],
  ["Player Edition 24", "Away", j24.url],
  ["Nigeria", "Home", j25.url],
  ["Italy", "Away", j26.url],
  ["USA", "Home", j27.url],
  ["Korea", "Home", j28.url],
  ["Player Edition 29", "Away", j29.url],
  ["Player Edition 30", "Home", j30.url],
  ["Player Edition 31", "Away", j31.url],
  ["Player Edition 32", "Home", j32.url],
  ["Brasil", "Away", j33.url],
  ["Player Edition 34", "Home", j34.url],
  ["Brasil", "Home", j35.url],
  ["Brasil", "Away", j36.url],
  ["Korea", "Away", j37.url],
  ["Mexico", "Home", j38.url],
  ["Colombia", "Home", j39.url],
  ["South Africa", "Home", j40.url],
  ["Player Edition 41", "Away", j41.url],
  ["Brasil", "Home", j42.url],
  ["Player Edition 43", "Home", j43.url],
  ["Mexico", "Away", j44.url],
  ["Player Edition 45", "Home", j45.url],
  ["Player Edition 46", "Away", j46.url],
];

const JERSEYS: Jersey[] = RAW.map(([team, tag, image], i) => ({
  id: `j${String(i + 1).padStart(2, "0")}`,
  team,
  tag,
  image,
}));

export function WorldCupSection() {
  const [active, setActive] = useState<Jersey | null>(null);

  return (
    <section className="relative overflow-hidden" id="collection">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbf7ee] to-white" />
      <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 70%, #b8862b 0, transparent 45%)",
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-16 md:py-24 text-neutral-900">
        {/* Banner */}
        <div className="relative mb-12 overflow-hidden rounded-2xl shadow-luxe" style={{ border: "1px solid #e6c976" }}>
          <img src={banner.url} alt="Checkmate Player Edition World Cup 2026" loading="lazy"
               className="w-full h-[180px] md:h-[280px] object-cover" />
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", color: "#8a6a14", border: "1px solid #e6c976", boxShadow: "0 1px 0 #ffffff inset, 0 8px 24px -12px rgba(184,134,43,0.45)" }}>
            <Trophy className="size-3.5" /> 46 Player-Edition Jerseys · Limited Drop
          </div>

          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#1a1a1a 0%,#1a1a1a 55%,#8a6a14 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              World Cup
            </span>{" "}
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Collection 2026
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-600">
            The complete player-edition catalogue — match-grade fabric, federation badges, heat-pressed numbers.
          </p>

          <div className="mt-5 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Home</span> <span className="text-neutral-500">₹1000</span></div>
            <div className="h-4 w-px bg-gold/40" />
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Away</span> <span className="text-neutral-500">₹1100</span></div>
          </div>
          <div className="mt-5 h-px w-24 hairline-gold" />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {JERSEYS.map((j) => (
            <article key={j.id} className="group relative overflow-hidden rounded-xl bg-white shadow-luxe transition hover:-translate-y-0.5" style={{ border: "1px solid #ecdcae" }}>
              <div className="absolute right-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", boxShadow: "0 4px 10px -6px rgba(184,134,43,0.6)" }}>
                <Sparkles className="size-2.5" /> Player
              </div>

              <button onClick={() => setActive(j)} className="block w-full" aria-label={`Order ${j.team}`}>
                <div className="aspect-[4/5] w-full overflow-hidden bg-gold-soft">
                  <img src={j.image} alt={`${j.team} ${j.tag} jersey`} loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              </button>

              <div className="px-2.5 py-2.5">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">{j.tag} · 2026</div>
                <div className="mt-0.5 font-display text-sm font-semibold text-neutral-900 truncate">{j.team}</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-[11px] text-[#8a6a14] font-bold">₹{j.tag === "Home" ? 1000 : 1100}</div>
                  <button onClick={() => setActive(j)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37" }}>
                    <ShoppingBag className="size-2.5" /> Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 text-center px-4">
            Free shipping · All-India delivery · Fast-delivery surcharge up to ₹100
          </div>
          <a href={`https://wa.me/917003369589?text=${encodeURIComponent("Hi, I'd like to see all available jerseys.")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37", boxShadow: "0 1px 0 #d4af37 inset, 0 18px 40px -16px rgba(184,134,43,0.6)" }}>
            Chat with us <ArrowRight className="size-4" />
          </a>
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
