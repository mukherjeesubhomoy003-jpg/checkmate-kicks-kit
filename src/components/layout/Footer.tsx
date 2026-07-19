import { Instagram, Mail, MessageCircle, Phone, ShieldCheck, Users, Trophy } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24 bg-[#050814] text-neutral-300 overflow-hidden">
      {/* Flag ribbon */}
      <div aria-hidden className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-[#AA151B]" />
        <div className="flex-1 bg-[#F1BF00]" />
        <div className="flex-1 bg-[#AA151B]" />
      </div>

      {/* Callout band */}
      <div className="relative border-b border-white/10 bg-black/40">
        <div aria-hidden className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 20% 50%, rgba(117,170,219,0.25), transparent 45%), radial-gradient(circle at 80% 50%, rgba(170,21,27,0.25), transparent 45%)" }} />
        <div className="container-x relative py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F1BF00]">
            <Trophy className="size-4" /> World Cup Final Today
          </div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
            1000+ jerseys shipped · Pan-India
          </div>
        </div>
      </div>

      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo className="h-12 w-auto rounded-md" />
          <p className="mt-4 text-sm text-neutral-400 max-w-sm leading-relaxed">
            Player-edition football jerseys, hand-picked and shipped across India.
            Crafted for collectors and matchday die-hards.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 border border-[#F1BF00]/50 bg-gradient-to-r from-[#75AADB]/10 via-white/5 to-[#AA151B]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F1BF00]">
            <ShieldCheck className="size-3.5" /> No COD — for buyer &amp; seller safety
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#75AADB] mb-5">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <FootLink icon={MessageCircle} href={`https://wa.me/${BRAND.whatsappPrimary}`} bold="WhatsApp Ankush" tail="+91 70033 69589" tone="blue" />
            <FootLink icon={Phone} href={`tel:+91${BRAND.whatsappAlt.slice(2)}`} bold="Alternate" tail="+91 85830 25727" tone="gold" />
            <FootLink icon={Mail} href={`mailto:${BRAND.email}`} bold={BRAND.email} tone="red" />
            <FootLink icon={Instagram} href={BRAND.instagram} bold="@checkmate.jersey" external tone="blue" />
            <FootLink icon={Users} href={BRAND.whatsappGroup} bold="Join WhatsApp community" external tone="gold" />
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#AA151B] mb-5">Shipping &amp; Policy</h4>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            <li className="flex gap-2"><span className="text-[#F1BF00]">✓</span> Free standard shipping — all India</li>
            <li className="flex gap-2"><span className="text-[#F1BF00]">✓</span> Delivered to your door within 7 days</li>
            <li className="flex gap-2"><span className="text-[#F1BF00]">✓</span> Order confirmed after UPI payment</li>
            <li className="flex gap-2"><span className="text-[#F1BF00]">✓</span> Order updates directly on WhatsApp</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> No Cash-on-Delivery (safety policy)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-neutral-500 flex flex-wrap gap-3 justify-between">
          <div>© {new Date().getFullYear()} <span className="text-white font-semibold">CHECKMATE</span> Jersey · All rights reserved.</div>
          <div className="font-bold uppercase tracking-[0.24em] bg-gradient-to-r from-[#75AADB] via-[#F1BF00] to-[#AA151B] bg-clip-text text-transparent">Checkmatenow.online</div>
        </div>
      </div>
    </footer>
  );
}

const TONE: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: "bg-[#75AADB]/15", text: "text-[#75AADB]", hover: "group-hover:bg-[#75AADB]" },
  gold: { bg: "bg-[#F1BF00]/15", text: "text-[#F1BF00]", hover: "group-hover:bg-[#F1BF00] group-hover:text-black" },
  red:  { bg: "bg-[#AA151B]/20", text: "text-[#AA151B]", hover: "group-hover:bg-[#AA151B]" },
};

function FootLink({
  icon: Icon, href, bold, tail, external, tone = "gold",
}: { icon: typeof Mail; href: string; bold: string; tail?: string; external?: boolean; tone?: "blue" | "gold" | "red" }) {
  const t = TONE[tone];
  return (
    <li>
      <a href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-2.5 text-neutral-300 hover:text-white transition">
        <span className={`grid size-7 place-items-center rounded-md ${t.bg} ${t.text} ${t.hover} group-hover:text-white transition`}>
          <Icon className="size-3.5" />
        </span>
        <span><span className="font-semibold text-white">{bold}</span>{tail ? <span className="text-neutral-500"> · {tail}</span> : null}</span>
      </a>
    </li>
  );
}
