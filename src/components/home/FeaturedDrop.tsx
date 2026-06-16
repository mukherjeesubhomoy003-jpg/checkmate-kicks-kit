import { useState } from "react";
import { Flame, Sparkles, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import argentinaImg from "@/assets/argentina-messi.jpg.asset.json";

export function FeaturedDrop() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1733] via-[#0a1228] to-[#0b1733]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={{
        backgroundImage: "radial-gradient(circle at 15% 20%, #75aadb 0, transparent 45%), radial-gradient(circle at 85% 80%, #d4af37 0, transparent 50%)",
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-14 md:py-20">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#e94560,#b8862b)", color: "#fff", border: "1px solid #d4af37", boxShadow: "0 10px 30px -10px rgba(233,69,96,0.6)" }}>
            <Flame className="size-3.5" /> Special Drop · Limited
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
            Argentina <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Home · Messi #10</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-300">
            Authentic player-version · with MESSI 10 printing 💙🤍🐐
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center max-w-5xl mx-auto">
          <button onClick={() => setOpen(true)}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-luxe block"
            style={{ border: "2px solid #d4af37" }}>
            <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "linear-gradient(135deg,#e94560,#8a1e30)", color: "#fff", boxShadow: "0 6px 16px -6px rgba(233,69,96,0.7)" }}>
              <Sparkles className="size-3" /> ₹1299 only
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden bg-gold-soft">
              <img src={argentinaImg.url} alt="Argentina Home — Messi 10 player version"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </button>

          <div className="text-white">
            <div className="flex items-center gap-1 text-[#f4d77a]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              <span className="ml-2 text-xs text-neutral-300">Best-seller of the week</span>
            </div>
            <div className="mt-3 font-display text-2xl md:text-3xl font-bold">Argentina Home · Player Version</div>
            <div className="mt-1 text-sm text-neutral-300">MESSI #10 printing included · World Champions 2022 badge</div>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="text-4xl font-extrabold" style={{ color: "#f4d77a" }}>₹1,299</div>
              <div className="text-sm line-through text-neutral-400">₹1,599</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Save ₹300</div>
            </div>

            <ul className="mt-5 space-y-1.5 text-sm text-neutral-200">
              <li>✅ Authentic player version (slim-fit, breathable mesh)</li>
              <li>✅ MESSI 10 printing included on the back</li>
              <li>✅ FIFA World Champions 2022 + AFA crest</li>
              <li>✅ Available in <b>L</b> and <b>XL</b> only</li>
              <li>✅ Optional: add your own name & number on back for ₹250</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 18px 40px -16px rgba(184,134,43,0.9)" }}>
                <ShoppingBag className="size-4" /> Order this Drop
              </button>
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-neutral-400">
              Free all-India shipping · 15–20 days delivery
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        open={open}
        team="Argentina · Messi 10"
        image={argentinaImg.url}
        priceOverride={1299}
        sizesOverride={["L", "XL"]}
        hideKitSelector
        defaultPrintingName="MESSI"
        defaultPrintingNumber="10"
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
