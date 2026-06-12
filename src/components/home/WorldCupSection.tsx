import { useState } from "react";
import { ArrowRight, Trophy, Sparkles, ShoppingBag } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";

import spain from "@/assets/jerseys/spain.jpg.asset.json";
import england from "@/assets/jerseys/england.jpg.asset.json";
import italy from "@/assets/jerseys/italy.jpg.asset.json";
import brasil from "@/assets/jerseys/brasil.jpg.asset.json";
import brasil2 from "@/assets/jerseys/brasil2.jpg.asset.json";
import japan from "@/assets/jerseys/japan.jpg.asset.json";
import nigeria from "@/assets/jerseys/nigeria.jpg.asset.json";
import usa from "@/assets/jerseys/usa.jpg.asset.json";
import korea from "@/assets/jerseys/korea.jpg.asset.json";
import mexico from "@/assets/jerseys/mexico.jpg.asset.json";
import colombia from "@/assets/jerseys/colombia.jpg.asset.json";
import southafrica from "@/assets/jerseys/southafrica.jpg.asset.json";

type Jersey = { id: string; team: string; tag: string; image: string };

const JERSEYS: Jersey[] = [
  { id: "br1", team: "Brasil", tag: "Home", image: brasil.url },
  { id: "ar1", team: "Spain", tag: "Away", image: spain.url },
  { id: "en1", team: "England", tag: "Home", image: england.url },
  { id: "it1", team: "Italy", tag: "Home", image: italy.url },
  { id: "fr1", team: "Japan", tag: "Home", image: japan.url },
  { id: "ng1", team: "Nigeria", tag: "Home", image: nigeria.url },
  { id: "us1", team: "USA", tag: "Home", image: usa.url },
  { id: "kr1", team: "Korea", tag: "Home", image: korea.url },
  { id: "mx1", team: "Mexico", tag: "Home", image: mexico.url },
  { id: "co1", team: "Colombia", tag: "Home", image: colombia.url },
  { id: "sa1", team: "South Africa", tag: "Home", image: southafrica.url },
  { id: "br2", team: "Brasil", tag: "Away", image: brasil2.url },
];

export function WorldCupSection() {
  const [active, setActive] = useState<Jersey | null>(null);

  return (
    <section className="relative overflow-hidden" id="collection">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbf7ee] to-white" />
      <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 70%, #b8862b 0, transparent 45%)",
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-20 md:py-28 text-neutral-900">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", color: "#8a6a14", border: "1px solid #e6c976", boxShadow: "0 1px 0 #ffffff inset, 0 8px 24px -12px rgba(184,134,43,0.45)" }}>
            <Trophy className="size-3.5" /> Player Edition · Limited Drop
          </div>

          <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#1a1a1a 0%,#1a1a1a 55%,#8a6a14 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              World Cup
            </span>
            <br />
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Collection 2026
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-neutral-600">
            The latest player-edition jerseys — match-grade fabric, federation badges, heat-pressed numbers. Worn on the world's biggest stage.
          </p>

          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Home Kit</span> <span className="text-neutral-500">₹1000</span></div>
            <div className="h-4 w-px bg-gold/40" />
            <div className="flex items-center gap-2"><span className="text-[#8a6a14] font-bold">Away Kit</span> <span className="text-neutral-500">₹1100</span></div>
          </div>

          <div className="mt-6 h-px w-28 hairline-gold" />
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JERSEYS.map((j) => (
            <article key={j.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-luxe" style={{ border: "1px solid #ecdcae" }}>
              <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", boxShadow: "0 6px 16px -8px rgba(184,134,43,0.6)" }}>
                <Sparkles className="size-3" /> Player Ed.
              </div>

              <button onClick={() => setActive(j)} className="block w-full" aria-label={`Order ${j.team}`}>
                <div className="aspect-[4/5] w-full overflow-hidden bg-gold-soft">
                  <img src={j.image} alt={`${j.team} ${j.tag} jersey`} loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              </button>

              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">{j.tag} Kit · 2026</div>
                  <div className="mt-1 font-display text-xl font-semibold text-neutral-900">{j.team}</div>
                  <div className="mt-1 text-sm text-[#8a6a14] font-semibold">
                    From ₹1000 <span className="text-neutral-400 font-normal">· Away ₹1100</span>
                  </div>
                </div>
                <button onClick={() => setActive(j)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37", boxShadow: "0 1px 0 #d4af37 inset, 0 12px 28px -14px rgba(184,134,43,0.55)" }}>
                  <ShoppingBag className="size-3.5" /> Order
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
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
