import { useState } from "react";
import { Flame, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import argFs from "@/assets/specials/argentina-fs.jpg.asset.json";
import porFs from "@/assets/specials/portugal-fs.jpg.asset.json";
import argPractice from "@/assets/specials/argentina-practice.jpg.asset.json";

type Drop = {
  key: string;
  team: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  price: number;
  mrp: number;
  sizes: ("S" | "M" | "L" | "XL" | "XXL")[];
};

const DROPS: Drop[] = [
  {
    key: "arg-fs",
    team: "Argentina · Home Full Sleeve",
    title: "Argentina Home",
    subtitle: "Full-Sleeve · Champions Badge · Player Edition",
    eyebrow: "Special Edition · Full Sleeve",
    image: argFs.url,
    price: 1200,
    mrp: 1799,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    key: "por-fs",
    team: "Portugal · Blackout Full Sleeve",
    title: "Portugal Blackout",
    subtitle: "Full-Sleeve · Ultraweave · Special Edition Collar",
    eyebrow: "Special Edition · Full Sleeve",
    image: porFs.url,
    price: 1200,
    mrp: 1799,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    key: "arg-practice",
    team: "Argentina · Pre-Match Practice PV",
    title: "Argentina Practice",
    subtitle: "Sunburst Pre-Match · Player Version",
    eyebrow: "Player Version · New Drop",
    image: argPractice.url,
    price: 999,
    mrp: 1599,
    sizes: ["S", "M", "L", "XL"],
  },
];

export function FeaturedDrop() {
  const [active, setActive] = useState<Drop | null>(null);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="container-x relative py-14 md:py-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-[#fa5400] text-white">
            <Flame className="size-3.5" /> Special Drops · Limited Stock
          </div>
          <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.9] tracking-tight uppercase text-white">
            Player Version
            <br />
            <span className="text-[#fa5400]">Special Editions.</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-neutral-300">
            Authentic player-version drops with official printing — full-sleeve editions and pre-match practice kits.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DROPS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d)}
              className="group text-left bg-[#f5f5f5] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {d.eyebrow}
                </div>
                <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  New
                </div>
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
              <div className="px-3 pt-3 pb-4">
                <div className="flex items-center gap-1 text-[#fa5400]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <h3 className="mt-1 font-bebas text-2xl md:text-3xl uppercase tracking-wide text-black leading-tight">
                  {d.title}
                </h3>
                <div className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider line-clamp-1">
                  {d.subtitle}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-bebas text-3xl tracking-wide text-black">MRP ₹{d.price}</span>
                  <span className="text-[11px] text-neutral-500 line-through">₹{d.mrp}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#fa5400]">
                    Save ₹{d.mrp - d.price}
                  </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-black text-white group-hover:bg-[#fa5400] transition-colors">
                  <ShoppingBag className="size-3.5" /> Order Now
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <OrderModal
        open={!!active}
        team={active?.team ?? ""}
        image={active?.image ?? ""}
        priceOverride={active?.price}
        sizesOverride={active?.sizes}
        hideKitSelector
        onClose={() => setActive(null)}
      />
    </section>
  );
}
