import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Users, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = (onClick?: () => void) => (
    <>
      <Link to="/" onClick={onClick} className="hover:text-[#8a6a14] whitespace-nowrap">Home</Link>
      <Link to="/world-cup-2026" onClick={onClick} className="hover:text-[#8a6a14] whitespace-nowrap">World Cup '26</Link>
      <Link to="/" hash="how" onClick={onClick} className="hover:text-[#8a6a14] whitespace-nowrap">How to Order</Link>
      <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" onClick={onClick} className="hover:text-[#8a6a14]">Contact</a>
      <Link to="/jersey-admin" onClick={onClick} className="hover:text-[#8a6a14] whitespace-nowrap text-[#8a6a14]">Admin</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-white/85 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px hairline-gold" />
      <div className="container-x flex h-16 items-center gap-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Checkmate home">
          <Logo className="h-10 w-auto rounded-md" />
        </Link>

        <nav className="hidden md:flex ml-6 items-center gap-6 text-sm font-semibold text-neutral-700">
          {navLinks()}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="p-2 rounded-full text-neutral-600 hover:text-[#8a6a14] hover:bg-[#fbf4dd]">
            <Instagram className="size-4" />
          </a>
          <a href={`mailto:${BRAND.email}`} aria-label="Email"
            className="hidden sm:inline-flex p-2 rounded-full text-neutral-600 hover:text-[#8a6a14] hover:bg-[#fbf4dd]">
            <Mail className="size-4" />
          </a>
          <a href={BRAND.whatsappGroup} target="_blank" rel="noopener noreferrer" aria-label="Join WhatsApp group"
            className="hidden sm:inline-flex p-2 rounded-full text-neutral-600 hover:text-[#8a6a14] hover:bg-[#fbf4dd]">
            <Users className="size-4" />
          </a>
          <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider"
            style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
            <MessageCircle className="size-3.5" /> Order
          </a>
          <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-full text-neutral-700 hover:bg-[#fbf4dd]">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/30 bg-white">
          <nav className="container-x flex flex-col gap-1 py-3 text-sm font-semibold text-neutral-800">
            {navLinks(() => setOpen(false))}
            <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
              style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
              <MessageCircle className="size-3.5" /> Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
