import { useState } from "react";
import { Flame, Sparkles, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import argentinaImg from "@/assets/argentina-messi.jpg.asset.json";
import portugalImg from "@/assets/portugal-special.jpg.asset.json";

export function FeaturedDrop() {
  const [openMessi, setOpenMessi] = useState(false);
  const [openRonaldo, setOpenRonaldo] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1733] via-[#0a1228] to-[#0b1733]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.18]" style={{
        backgroundImage: "radial-gradient(circle at 15% 20%, #75aadb 0, transparent 45%), radial-gradient(circle at 85% 80%, #d4af37 0, transparent 50%)",
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-14 md:py-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#e94560,#b8862b)", color: "#fff", border: "1px solid #d4af37", boxShadow: "0 10px 30px -10px rgba(233,69,96,0.6)" }}>
            <Flame className="size-3.5" /> Special Drops · Limited Edition
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
            Player Version <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Special Editions</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-300">
            Authentic player-version jerseys with official printing included
          </p>
        </div>

        {/* Two Special Drops Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Argentina Messi */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-[#0d1a30]/80 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: "linear-gradient(135deg,#e94560,#8a1e30)", color: "#fff", boxShadow: "0 6px 16px -6px rgba(233,69,96,0.7)" }}>
                <Sparkles className="size-3" /> ₹1299 only
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">GOAT Edition</span>
            </div>
            
            <button onClick={() => setOpenMessi(true)}
              className="group relative overflow-hidden rounded-xl bg-white shadow-luxe block w-full"
              style={{ border: "2px solid #d4af37" }}>
              <div className="aspect-[3/4] w-full overflow-hidden bg-gold-soft">
                <img src={argentinaImg.url} alt="Argentina Home — Messi 10 player version" loading="lazy" decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
            </button>

            <div className="mt-4 text-white">
              <div className="flex items-center gap-1 text-[#f4d77a]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                <span className="ml-2 text-xs text-neutral-300">Best-seller</span>
              </div>
              <div className="mt-2 font-display text-xl md:text-2xl font-bold">Argentina Home · Messi #10</div>
              <div className="mt-1 text-sm text-neutral-300">MESSI 10 printing included · World Champions 2022 badge</div>

              <div className="mt-3 flex items-baseline gap-3">
                <div className="text-3xl font-extrabold" style={{ color: "#f4d77a" }}>₹1,299</div>
                <div className="text-sm line-through text-neutral-400">₹1,599</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Save ₹300</div>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                <li>✅ Authentic player version (slim-fit, breathable mesh)</li>
                <li>✅ MESSI 10 printing included on the back</li>
                <li>✅ FIFA World Champions 2022 + AFA crest</li>
                <li>✅ Available in <b>XL</b> only (limited stock)</li>
              </ul>

              <button onClick={() => setOpenMessi(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 18px 40px -16px rgba(184,134,43,0.9)" }}>
                <ShoppingBag className="size-4" /> Order Now
              </button>
            </div>
          </div>

          {/* Portugal Ronaldo */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-[#0d1a30]/80 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: "linear-gradient(135deg,#e94560,#8a1e30)", color: "#fff", boxShadow: "0 6px 16px -6px rgba(233,69,96,0.7)" }}>
                <Sparkles className="size-3" /> ₹1299 only
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">GOAT Edition</span>
            </div>
            
            <button onClick={() => setOpenRonaldo(true)}
              className="group relative overflow-hidden rounded-xl bg-white shadow-luxe block w-full"
              style={{ border: "2px solid #d4af37" }}>
              <div className="aspect-[3/4] w-full overflow-hidden bg-gold-soft">
                <img src={portugalImg.url} alt="Portugal Away — Ronaldo 7 player version" loading="lazy" decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
            </button>

            <div className="mt-4 text-white">
              <div className="flex items-center gap-1 text-[#f4d77a]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                <span className="ml-2 text-xs text-neutral-300">New Arrival</span>
              </div>
              <div className="mt-2 font-display text-xl md:text-2xl font-bold">Portugal Away · Ronaldo #7</div>
              <div className="mt-1 text-sm text-neutral-300">RONALDO 7 printing included · Official Portugal crest</div>

              <div className="mt-3 flex items-baseline gap-3">
                <div className="text-3xl font-extrabold" style={{ color: "#f4d77a" }}>₹1,299</div>
                <div className="text-sm line-through text-neutral-400">₹1,599</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Save ₹300</div>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                <li>✅ Authentic player version (slim-fit, breathable mesh)</li>
                <li>✅ Official Portugal FPF crest + Puma badge</li>
                <li>✅ Available in <b>L</b> and <b>XL</b> only</li>
              </ul>

              <button onClick={() => setOpenRonaldo(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 18px 40px -16px rgba(184,134,43,0.9)" }}>
                <ShoppingBag className="size-4" /> Order Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Messi Order Modal */}
      <OrderModal
        open={openMessi}
        team="Argentina · Messi 10"
        image={argentinaImg.url}
        priceOverride={1299}
        sizesOverride={["XL"]}
        hideKitSelector
        defaultPrintingName="MESSI"
        defaultPrintingNumber="10"
        onClose={() => setOpenMessi(false)}
      />

      {/* Ronaldo Order Modal */}
      <OrderModal
        open={openRonaldo}
        team="Portugal · Ronaldo 7"
        image={portugalImg.url}
        priceOverride={1299}
        sizesOverride={["L", "XL"]}
        hideKitSelector
        defaultPrintingName="RONALDO"
        defaultPrintingNumber="7"
        onClose={() => setOpenRonaldo(false)}
      />
    </section>
  );
}
