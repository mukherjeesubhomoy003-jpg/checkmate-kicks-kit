import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Instagram, MessageCircle, Search, X, Trophy, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";
import { JERSEYS } from "@/lib/jerseys";
import { FAN_JERSEYS } from "@/lib/fan-jerseys";
import { JACKETS } from "@/lib/jackets";
import { SETS } from "@/lib/sets";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const query = q.trim().toLowerCase();
  const results = query.length >= 1 ? [
    ...JERSEYS.filter(j => `${j.team} ${j.tag}`.toLowerCase().includes(query)).map(j => ({
      id: `pv-${j.id}`, label: `${j.team} ${j.tag}`, sub: "Player Version · ₹850", to: "/player-version" as const, image: j.image,
    })),
    ...FAN_JERSEYS.filter(j => `${j.team} ${j.tag}`.toLowerCase().includes(query)).map(j => ({
      id: `fan-${j.id}`, label: `${j.team} ${j.tag}`, sub: "Fan Version · ₹750", to: "/fan-version" as const, image: j.image,
    })),
    ...JACKETS.filter(j => `${j.team} ${j.tag} jacket`.toLowerCase().includes(query)).map(j => ({
      id: `jk-${j.id}`, label: `${j.team} — ${j.tag}`, sub: "Jacket · ₹1750", to: "/jackets" as const, image: j.image,
    })),
    ...SETS.filter(s => `${s.team} ${s.tag} set`.toLowerCase().includes(query)).map(s => ({
      id: `set-${s.id}`, label: `${s.team} · ${s.tag}`, sub: "1st Grade Set · ₹699", to: "/sets" as const, image: s.image,
    })),
    ...("shorts".includes(query) ? [{ id: "shorts", label: "Shorts", sub: "Match-grade · ₹250", to: "/shorts" as const, image: "" }] : []),
  ].slice(0, 12) : [];

  const closeSearch = () => { setSearchOpen(false); setQ(""); };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        {/* Flag ribbon */}
        <div aria-hidden className="h-1 w-full flex">
          <div className="flex-1 bg-[#75AADB]" />
          <div className="flex-1 bg-white border-y border-black/5" />
          <div className="flex-1 bg-[#75AADB]" />
          <div className="flex-1 bg-[#AA151B]" />
          <div className="flex-1 bg-[#F1BF00]" />
          <div className="flex-1 bg-[#AA151B]" />
        </div>
        <div className="container-x flex h-14 sm:h-16 items-center gap-2 sm:gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Checkmate home">
            <Logo className="h-8 sm:h-10 w-auto rounded-md" />
          </Link>

          <nav className="flex ml-2 sm:ml-6 items-center gap-3 sm:gap-5 text-[11px] sm:text-sm font-semibold text-neutral-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Link to="/" className="hover:text-[#AA151B] whitespace-nowrap">Home</Link>
            <Link to="/sets" className="hover:text-[#AA151B] whitespace-nowrap text-[#AA151B] font-bold inline-flex items-center gap-1"><Trophy className="size-3.5 text-[#F1BF00]" />Final</Link>
            <Link to="/embroidery" className="whitespace-nowrap font-bold text-[#F1BF00] bg-black px-2 py-0.5 rounded-sm inline-flex items-center gap-1"><Sparkles className="size-3.5" />Embroidery</Link>
            <Link to="/player-version" className="hover:text-[#75AADB] whitespace-nowrap">Player</Link>
            <Link to="/fan-version" className="hover:text-[#75AADB] whitespace-nowrap">Fan</Link>
            <Link to="/jackets" className="hover:text-[#AA151B] whitespace-nowrap">Jackets</Link>
            <Link to="/shorts" className="hover:text-[#AA151B] whitespace-nowrap">Shorts</Link>
            <Link to="/polos" className="hover:text-[#AA151B] whitespace-nowrap">Polos</Link>
            <Link to="/jersey-admin" className="hover:text-[#AA151B] whitespace-nowrap text-[#AA151B]">Admin</Link>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="inline-flex p-2 rounded-full text-neutral-700 hover:text-[#AA151B] hover:bg-neutral-100"
            >
              <Search className="size-4" />
            </button>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="hidden sm:inline-flex p-2 rounded-full text-neutral-600 hover:text-[#AA151B] hover:bg-neutral-100">
              <Instagram className="size-4" />
            </a>
            <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-none px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black hover:opacity-90 transition"
              style={{ background: "linear-gradient(90deg,#75AADB,#F1BF00,#AA151B)" }}>
              <Trophy className="size-3.5" /> Order Final
            </a>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[100]">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} aria-label="Close search" />
          <div className="relative mx-auto mt-16 max-w-2xl bg-white shadow-2xl">
            <div className="flex items-center border-b border-black/10 px-4 py-3">
              <Search className="size-5 text-neutral-500 mr-3 shrink-0" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search team or category (e.g. Argentina, Portugal, Posters)…"
                className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              <button onClick={closeSearch} className="ml-2 p-1.5 hover:bg-neutral-100 rounded-full shrink-0">
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="p-6 text-sm text-neutral-500 text-center">No matches for "{q}"</div>
              )}
              {results.map(r => (
                <button
                  key={r.id}
                  onClick={() => { closeSearch(); navigate({ to: r.to }); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 border-b border-black/5 text-left"
                >
                  {r.image ? (
                    <img src={r.image} alt="" className="size-10 object-cover bg-neutral-100 shrink-0" />
                  ) : (
                    <div className="size-10 bg-neutral-100 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-black truncate">{r.label}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#fa5400]">{r.sub}</div>
                  </div>
                </button>
              ))}
              {!query && (
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500 mb-3">Quick jump</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { l: "1st Grade Sets", to: "/sets" as const },
                      { l: "Player Version", to: "/player-version" as const },
                      { l: "Fan Version", to: "/fan-version" as const },
                      { l: "Jackets", to: "/jackets" as const },
                      { l: "Polos", to: "/polos" as const },
                      { l: "Shorts", to: "/shorts" as const },
                    ].map(x => (
                      <button key={x.l} onClick={() => { closeSearch(); navigate({ to: x.to }); }}
                        className="px-3 py-1.5 text-xs font-semibold border border-black/15 hover:bg-black hover:text-white transition">
                        {x.l}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
