import { Instagram, Mail, MessageCircle, Phone, ShieldCheck, Users, Flame } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24 bg-[#0a0a0a] text-neutral-300">
      {/* Top orange hairline */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg,#fa5400,#ff8a3d,#fa5400)" }} />

      {/* Callout band */}
      <div className="border-b border-white/10 bg-[#111]">
        <div className="container-x py-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#fa5400]">
            <Flame className="size-4" /> Wear Your Passion
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
          <div className="mt-5 inline-flex items-center gap-2 border border-[#fa5400]/40 bg-[#fa5400]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fa5400]">
            <ShieldCheck className="size-3.5" /> No COD — for buyer &amp; seller safety
          </div>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#fa5400] mb-5">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <FootLink icon={MessageCircle} href={`https://wa.me/${BRAND.whatsappPrimary}`} bold="WhatsApp Ankush" tail="+91 70033 69589" />
            <FootLink icon={Phone} href={`tel:+91${BRAND.whatsappAlt.slice(2)}`} bold="Alternate" tail="+91 85830 25727" />
            <FootLink icon={Mail} href={`mailto:${BRAND.email}`} bold={BRAND.email} />
            <FootLink icon={Instagram} href={BRAND.instagram} bold="@checkmate.jersey" external />
            <FootLink icon={Users} href={BRAND.whatsappGroup} bold="Join WhatsApp community" external />
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#fa5400] mb-5">Shipping &amp; Policy</h4>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            <li className="flex gap-2"><span className="text-[#fa5400]">✓</span> Free standard shipping — all India</li>
            <li className="flex gap-2"><span className="text-[#fa5400]">✓</span> Delivered to your door within 7 days</li>
            <li className="flex gap-2"><span className="text-[#fa5400]">✓</span> Order confirmed after UPI payment</li>
            <li className="flex gap-2"><span className="text-[#fa5400]">✓</span> Order updates directly on WhatsApp</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> No Cash-on-Delivery (safety policy)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-neutral-500 flex flex-wrap gap-3 justify-between">
          <div>© {new Date().getFullYear()} <span className="text-white font-semibold">CHECKMATE</span> Jersey · All rights reserved.</div>
          <div className="text-[#fa5400] font-bold uppercase tracking-[0.24em]">Checkmatenow.online</div>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  icon: Icon, href, bold, tail, external,
}: { icon: typeof Mail; href: string; bold: string; tail?: string; external?: boolean }) {
  return (
    <li>
      <a href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-2.5 text-neutral-300 hover:text-white transition">
        <span className="grid size-7 place-items-center rounded-md bg-[#fa5400]/15 text-[#fa5400] group-hover:bg-[#fa5400] group-hover:text-white transition">
          <Icon className="size-3.5" />
        </span>
        <span><span className="font-semibold text-white">{bold}</span>{tail ? <span className="text-neutral-500"> · {tail}</span> : null}</span>
      </a>
    </li>
  );
}
