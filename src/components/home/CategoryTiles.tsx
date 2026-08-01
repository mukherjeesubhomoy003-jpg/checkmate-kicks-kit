import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

// Product-forward thumbnails pulled from each section's own catalogue.
import pvSpecial from "@/assets/thumbs/player.jpg.asset.json";
import fanTile from "@/assets/thumbs/fan.jpg.asset.json";
import jacketBanner from "@/assets/thumbs/jacket.jpg.asset.json";
import shortsTile from "@/assets/thumbs/shorts.jpg.asset.json";
import poloTile from "@/assets/polos/germany-white.jpg.asset.json";
import setsTile from "@/assets/sets/set07.jpg.asset.json";
import embTile from "@/assets/embroidery/rm-front.jpg.asset.json";
import clubPvTile from "@/assets/club-pv/cpv5.jpg.asset.json";
import fanFsTile from "@/assets/fan-fs/ffs2.jpg.asset.json";
import clubEmbTile from "@/assets/club-emb/ce1.jpg.asset.json";
import fsRetroTile from "@/assets/fsretro/fsr1.jpg.asset.json";

type Tile = {
  to:
    | "/player-version"
    | "/fan-version"
    | "/jackets"
    | "/shorts"
    | "/polos"
    | "/sets"
    | "/embroidery"
    | "/club-pv"
    | "/fan-fs"
    | "/club-emb"
    | "/fs-retro";
  label: string;
  sub: string;
  price: string;
  note?: string;
  image?: string;
  isNew?: boolean;
};

const TILES: Tile[] = [
  { to: "/club-emb", label: "Club Embroidery", sub: "Latest 2026/27 club season", price: "₹450", note: "No shipping", image: clubEmbTile.url, isNew: true },
  { to: "/fs-retro", label: "Full Sleeve Retro", sub: "Retro & latest · embroidery", price: "₹950", note: "Free shipping", image: fsRetroTile.url, isNew: true },
  { to: "/club-pv", label: "Club Edition PV", sub: "Player version · 25/26 club drop", price: "₹899", note: "Free shipping", image: clubPvTile.url, isNew: true },
  { to: "/fan-fs", label: "Fan Full Sleeve", sub: "Long sleeve club edition", price: "₹950", note: "Free shipping", image: fanFsTile.url, isNew: true },
  { to: "/embroidery", label: "Embroidery", sub: "Premium stitched crest & sponsor", price: "₹450", note: "No shipping", image: embTile.url, isNew: true },
  { to: "/sets", label: "1st Grade Sets", sub: "Jersey + shorts kit", price: "₹699", image: setsTile.url },
  { to: "/player-version", label: "Player Version", sub: "Match-grade fit", price: "₹850", image: pvSpecial.url },
  { to: "/fan-version", label: "Fan Version", sub: "Everyday supporter kit", price: "₹750", image: fanTile.url },
  { to: "/jackets", label: "Jackets", sub: "Club & country track jackets", price: "₹1750", image: jacketBanner.url },
  { to: "/polos", label: "Polo T-Shirts", sub: "Club & country polos", price: "₹1200", image: poloTile.url },
  { to: "/shorts", label: "Shorts", sub: "Club & country · match-grade", price: "₹250", note: "+₹50 shipping", image: shortsTile.url },
];


export function CategoryTiles() {
  return (
    <section className="relative bg-neutral-950 text-white" id="shop">
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="container-x relative py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em]">
              Shop by category
            </div>
            <h2 className="mt-4 font-bebas text-4xl md:text-6xl uppercase leading-[0.88] tracking-tight">
              Pick your{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#EA580C] bg-clip-text text-transparent">
                lane.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/55 leading-relaxed">
            Nine curated drops — match-grade player kits, fan versions, full-sleeve club
            editions, sets, jackets and more. Every piece quality checked before dispatch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5">
          {TILES.map((t, idx) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative block overflow-hidden bg-neutral-900 aspect-[4/5] md:aspect-[3/4] ring-1 ring-white/10 transition-all duration-300 hover:ring-[#F59E0B]/60"
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt={`${t.label} — ${t.sub}`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
              ) : (
                <div className="size-full bg-gradient-to-br from-neutral-800 to-black" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#EA580C]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="absolute top-3 left-3 font-bebas text-xs tracking-[0.3em] text-white/45">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {t.isNew && (
                <span className="absolute top-3 right-3 bg-[#F59E0B] text-black text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1">
                  New
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
                <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] text-[#F59E0B]">
                  {t.sub}
                </div>
                <div className="font-bebas text-2xl md:text-4xl uppercase leading-none tracking-wide mt-1">
                  {t.label}
                </div>
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <div className="text-sm md:text-lg font-bold leading-none">{t.price}</div>
                    {t.note && (
                      <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/50">
                        {t.note}
                      </div>
                    )}
                  </div>
                  <span className="grid size-8 md:size-10 place-items-center border border-white/25 transition-colors group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
