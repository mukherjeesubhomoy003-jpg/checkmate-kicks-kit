import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

// Fresh product-forward thumbnails pulled from each section's own catalogue.
import pvSpecial from "@/assets/thumbs/player.jpg.asset.json";
import fanTile from "@/assets/thumbs/fan.jpg.asset.json";
import jacketBanner from "@/assets/thumbs/jacket.jpg.asset.json";
import shortsTile from "@/assets/thumbs/shorts.jpg.asset.json";
import posterTile from "@/assets/thumbs/poster.jpg.asset.json";
import poloTile from "@/assets/polos/germany-white.jpg.asset.json";

type Tile = {
  to: "/player-version" | "/fan-version" | "/jackets" | "/shorts" | "/polos" | "/posters";
  label: string;
  sub: string;
  price: string;
  image?: string;
  soon?: boolean;
};

const TILES: Tile[] = [
  { to: "/player-version", label: "Player Version", sub: "Match-grade · WC 2026", price: "₹850", image: pvSpecial.url },
  { to: "/fan-version", label: "Fan Version", sub: "Everyday supporter kit", price: "₹750", image: fanTile.url },
  { to: "/jackets", label: "Jackets", sub: "Club & country track jackets", price: "₹1750", image: jacketBanner.url },
  { to: "/polos", label: "Polo T-Shirts", sub: "Club & country polos", price: "₹1200", image: poloTile.url },
  { to: "/shorts", label: "Shorts", sub: "Club & country · match-grade", price: "₹250 +₹50 ship", image: shortsTile.url },
  { to: "/posters", label: "Wall Posters", sub: "Legend series prints", price: "₹99", image: posterTile.url },
];

export function CategoryTiles() {
  return (
    <section className="relative bg-white" id="shop">
      <div className="container-x py-14 md:py-20">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">
            Shop by Category
          </div>
          <h2 className="mt-4 font-bebas text-4xl md:text-6xl uppercase leading-[0.9] tracking-tight">
            Pick your <span className="text-[#fa5400]">lane.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {TILES.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]"
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  className={`size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${t.soon ? "grayscale opacity-60" : ""}`}
                />
              ) : (
                <div className="size-full bg-gradient-to-br from-neutral-800 to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              {t.soon && (
                <div className="absolute top-2 right-2 bg-[#fa5400] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1">
                  Soon
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">
                <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#fa5400]">
                  {t.sub}
                </div>
                <div className="font-bebas text-xl md:text-3xl uppercase leading-tight tracking-wide mt-0.5">
                  {t.label}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] md:text-sm font-bold">{t.price}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
