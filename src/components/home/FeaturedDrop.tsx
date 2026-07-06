import { useState } from "react";
import { Flame, Sparkles, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import portugalImg from "@/assets/portugal-special.jpg.asset.json";

export function FeaturedDrop() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-[#fa5400] text-white">
            <Flame className="size-3.5" /> Special Drops · Limited Edition
          </div>
          <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.9] tracking-tight uppercase text-white">
            Player Version<br />
            <span className="text-[#f4d77a]">Special Editions.</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-300">
            Authentic player-version jerseys with official printing included
          </p>
        </div>


        {/* Special Drop */}
        <div className="grid gap-8 max-w-2xl mx-auto">

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
              <div className="mt-2 font-bebas text-2xl md:text-3xl uppercase tracking-wide">Portugal Away · Ronaldo #7</div>
              <div className="mt-1 text-sm text-neutral-300">Official Portugal FPF crest · Player-edition slim fit</div>

              <div className="mt-3 flex items-baseline gap-3">
                <div className="font-bebas text-4xl tracking-wide text-white">MRP ₹1,299</div>
                <div className="text-sm line-through text-neutral-500">₹1,599</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#fa5400]">Save ₹300</div>
              </div>

              <ul className="mt-3 space-y-1 text-sm text-neutral-200">
                <li>✅ Authentic player version (slim-fit, breathable mesh)</li>
                <li>✅ Official Portugal FPF crest + Puma badge</li>
                <li>✅ Available in <b>L</b> and <b>XL</b> only</li>
              </ul>


              <button onClick={() => setOpenRonaldo(true)}
                className="mt-4 inline-flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-[#fa5400] hover:text-white transition-colors">
                <ShoppingBag className="size-4" /> Order Now
              </button>
            </div>
          </div>


        </div>
      </div>


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
