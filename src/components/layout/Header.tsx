import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";

export function Header() {
  const navLinks = (
    <>
      <Link to="/" className="hover:text-[#8a6a14] whitespace-nowrap">Home</Link>
      <Link to="/world-cup-2026" className="hover:text-[#8a6a14] whitespace-nowrap">WC '26</Link>
      <Link to="/" hash="how" className="hover:text-[#8a6a14] whitespace-nowrap">How</Link>
      <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a14]">Contact</a>
      <Link to="/jersey-admin" className="hover:text-[#8a6a14] whitespace-nowrap text-[#8a6a14]">Admin</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-white/85 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px hairline-gold" />
      <div className="container-x flex h-14 sm:h-16 items-center gap-2 sm:gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Checkmate home">
          <Logo className="h-8 sm:h-10 w-auto rounded-md" />
        </Link>

        <nav className="flex ml-2 sm:ml-6 items-center gap-3 sm:gap-6 text-[12px] sm:text-sm font-semibold text-neutral-700 overflow-x-auto no-scrollbar">
          {navLinks}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="hidden sm:inline-flex p-2 rounded-full text-neutral-600 hover:text-[#8a6a14] hover:bg-[#fbf4dd]">
            <Instagram className="size-4" />
          </a>
          <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider"
            style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
            <MessageCircle className="size-3.5" /> Order
          </a>
        </div>
      </div>
    </header>
  );
}

