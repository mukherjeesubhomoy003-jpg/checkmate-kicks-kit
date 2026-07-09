import { useState } from "react";
import { Flame, ShoppingBag, Star } from "lucide-react";
import { OrderModal } from "@/components/order/OrderModal";
import argFs from "@/assets/specials/argentina-fs.jpg.asset.json";
import porFs from "@/assets/specials/portugal-fs.jpg.asset.json";
import argPractice from "@/assets/specials/argentina-practice.jpg.asset.json";
import brasilAway from "@/assets/specials/brazil-away-se.jpg.asset.json";

type Size = "S" | "M" | "L" | "XL" | "XXL";
type Drop = {
  key: string;
  team: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  image: string;
  price: number;
  mrp: number;
  sizes: Size[];
  badge?: string;
};

const DROPS: Drop[] = [
  {
    key: "arg-fs",
    team: "Argentina · Home Full Sleeve",
    title: "Argentina Home",
    subtitle: "Full-Sleeve · Champions Badge · Player Edition",
    eyebrow: "Full Sleeve · Player",
    image: argFs.url,
    price: 1200, mrp: 1799,
    sizes: ["M", "L", "XL"],
    badge: "Ltd",
  },
  {
    key: "por-fs",
    team: "Portugal · Blackout Full Sleeve",
    title: "Portugal Blackout",
    subtitle: "Full-Sleeve · Ultraweave · Special Edition Collar",
    eyebrow: "Full Sleeve · Player",
    image: porFs.url,
    price: 1200, mrp: 1799,
    sizes: ["L", "XL"],
    badge: "Ltd",
  },
  {
    key: "arg-practice",
    team: "Argentina · Pre-Match Practice PV",
    title: "Argentina Practice",
    subtitle: "Sunburst Pre-Match · Player Version",
    eyebrow: "Player Version · New",
    image: argPractice.url,
    price: 999, mrp: 1599,
    sizes: ["M", "L"],
    badge: "New",
  },
  {
    key: "brasil-away-special",
    team: "Brasil · Away Player Version",
    title: "Brasil Away",
    subtitle: "Jordan Silhouette · Player Version",
    eyebrow: "Special · Player",
    image: brasilAway.url,
    price: 800, mrp: 1499,
    sizes: ["S", "M", "L", "XL"],
    badge: "Deal",
  },
];

export function FeaturedDrop() {
  const [active, setActive] = useState<Drop | null>(null);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="container-x relative py-12 md:py-20">
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-[#fa5400] text-white">
            <Flame className="size-3.5" /> Special Drops · Limited Stock
          </div>
          <h2 className="mt-4 font-bebas text-3xl sm:text-5xl md:text-7xl leading-[0.9] tracking-tight uppercase text-white">
            Player Version
            <br />
            <span className="text-[#fa5400]">Special Editions.</span>
          </h2>
          <p className="mt-2 max-w-xl text-xs md:text-sm text-neutral-300">
            Authentic player-version drops — full-sleeve editions, pre-match kits, and exclusive PV colourways.
          </p>
        </div>

        <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DROPS.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d)}
              className="group text-left bg-[#f5f5f5] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <div className="absolute left-1.5 top-1.5 md:left-2 md:top-2 z-10 bg-[#fa5400] px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                  {d.eyebrow}
                </div>
                {d.badge && (
                  <div className="absolute right-1.5 top-1.5 md:right-2 md:top-2 z-10 bg-black px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                    {d.badge}
                  </div>
                )}
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
              <div className="px-2 pt-2 pb-3 md:px-3 md:pt-3 md:pb-4">
                <div className="hidden md:flex items-center gap-1 text-[#fa5400]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <h3 className="mt-0.5 md:mt-1 font-bebas text-lg md:text-2xl uppercase tracking-wide text-black leading-tight line-clamp-2">
                  {d.title}
                </h3>
                <div className="mt-0.5 text-[10px] md:text-[11px] text-neutral-500 uppercase tracking-wider line-clamp-1">
                  {d.subtitle}
                </div>
                <div className="mt-1.5 md:mt-2 flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                  <span className="font-bebas text-xl md:text-3xl tracking-wide text-black">₹{d.price}</span>
                  <span className="text-[10px] md:text-[11px] text-neutral-500 line-through">₹{d.mrp}</span>
                </div>
                <div className="mt-2 md:mt-3 inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] md:tracking-[0.2em] bg-black text-white group-hover:bg-[#fa5400] transition-colors">
                  <ShoppingBag className="size-3 md:size-3.5" /> Order
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
