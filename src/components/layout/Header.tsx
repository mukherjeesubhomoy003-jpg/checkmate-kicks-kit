import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Instagram, Search, X, Trophy, Sparkles, Menu, ShoppingCart } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";
import { JERSEYS } from "@/lib/jerseys";
import { FAN_JERSEYS } from "@/lib/fan-jerseys";
import { JACKETS } from "@/lib/jackets";
import { SETS } from "@/lib/sets";
import { useBulkCart } from "@/lib/bulk-cart";

const NAV_LINKS: { to: "/" | "/sets" | "/embroidery" | "/player-version" | "/fan-version" | "/jackets" | "/shorts" | "/polos" | "/jersey-admin"; label: string; badge?: string; }[] = [
  { to: "/", label: "Home" },
  { to: "/sets", label: "Final · Sets", badge: "hot" },
  { to: "/embroidery", label: "Embroidery" },
  { to: "/player-version", label: "Player" },
  { to: "/fan-version", label: "Fan" },
  { to: "/jackets", label: "Jackets" },
  { to: "/shorts", label: "Shorts" },
  { to: "/polos", label: "Polos" },
  { to: "/jersey-admin", label: "Admin" },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const cart = useBulkCart();

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
        <div aria-hidden className="h-1 w-full flex">
          <div className="flex-1 bg-[#75AADB]" />
          <div className="flex-1 bg-white border-y border-black/5" />
          <div className="flex-1 bg-[#75AADB]" />
          <div className="flex-1 bg-[#AA151B]" />
          <div className="flex-1 bg-[#F1BF00]" />
          <div className="flex-1 bg-[#AA151B]" />
        </div>
        <div className="container-x flex h-14 sm:h-16 items-center gap-2 sm:gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="lg:hidden inline-flex p-2 -ml-2 rounded-md text-neutral-800 hover:bg-neutral-100"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Checkmate home">
            <Logo className="h-8 sm:h-10 w-auto rounded-md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex ml-6 items-center gap-5 text-sm font-semibold text-neutral-700">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap hover:text-[#AA151B] ${l.badge === "hot" ? "text-[#AA151B] font-bold inline-flex items-center gap-1" : ""} ${l.to === "/embroidery" ? "font-bold text-[#F1BF00] bg-black px-2 py-0.5 rounded-sm inline-flex items-center gap-1" : ""}`}
              >
                {l.badge === "hot" && <Trophy className="size-3.5 text-[#F1BF00]" />}
                {l.to === "/embroidery" && <Sparkles className="size-3.5" />}
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="inline-flex p-2 rounded-full text-neutral-700 hover:text-[#AA151B] hover:bg-neutral-100"
            >
              <Search className="size-4" />
            </button>
            <Link
              to="/bulk-cart"
              aria-label="Cart"
              className="relative inline-flex p-2 rounded-full text-neutral-700 hover:text-[#AA151B] hover:bg-neutral-100"
            >
              <ShoppingCart className="size-4" />
              {cart.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center text-[10px] font-bold bg-[#fa5400] text-white rounded-full">
                  {cart.count}
                </span>
              )}
            </Link>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="hidden sm:inline-flex p-2 rounded-full text-neutral-600 hover:text-[#AA151B] hover:bg-neutral-100">
              <Instagram className="size-4" />
            </a>
            <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-none px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black hover:opacity-90 transition"
              style={{ background: "linear-gradient(90deg,#75AADB,#F1BF00,#AA151B)" }}>
              <Trophy className="size-3.5" /> Order Final
            </a>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <aside className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-2xl flex flex-col animate-[slide-in-right_.25s_ease-out]" style={{ animationName: "slide-in-left" }}>
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
              <div className="flex items-center gap-2"><Logo className="h-8 w-auto rounded-md" /></div>
              <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-neutral-100" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-3.5 border-b border-black/5 text-[15px] font-semibold text-neutral-800 hover:bg-neutral-50"
                >
                  <span className="inline-flex items-center gap-2">
                    {l.badge === "hot" && <Trophy className="size-4 text-[#F1BF00]" />}
                    {l.to === "/embroidery" && <Sparkles className="size-4 text-[#F1BF00]" />}
                    {l.label}
                  </span>
                  <span className="text-neutral-300">›</span>
                </Link>
              ))}
              <Link to="/bulk-cart" onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-5 py-3.5 border-b border-black/5 text-[15px] font-semibold text-[#fa5400] hover:bg-neutral-50">
                <span className="inline-flex items-center gap-2"><ShoppingCart className="size-4" /> My Cart</span>
                {cart.count > 0 && <span className="min-w-[22px] h-[22px] px-1.5 grid place-items-center text-[11px] font-bold bg-[#fa5400] text-white rounded-full">{cart.count}</span>}
              </Link>
            </nav>
            <div className="border-t border-black/10 p-4 space-y-2">
              <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
                className="block text-center rounded-md px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-black"
                style={{ background: "linear-gradient(90deg,#75AADB,#F1BF00,#AA151B)" }}>
                WhatsApp · Order Final
              </a>
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-md border border-black/15 px-3 py-2 text-xs font-semibold text-neutral-700">
                <Instagram className="size-4" /> @checkmate.jersey
              </a>
            </div>
          </aside>
        </div>
      )}

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
                placeholder="Search team or category…"
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
