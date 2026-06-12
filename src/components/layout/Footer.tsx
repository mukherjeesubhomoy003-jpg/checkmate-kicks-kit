import { Instagram, Mail, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND } from "@/components/order/OrderModal";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24 border-t border-gold/40 bg-[#fbf7ee]">
      <div className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div className="container-x py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo className="h-12 w-auto rounded-md" />
          <p className="mt-3 text-sm text-neutral-600 max-w-sm">
            Player-edition football jerseys, hand-picked and shipped across India.
            Crafted for collectors and matchday die-hards.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#8a6a14] font-semibold uppercase tracking-wider">
            <ShieldCheck className="size-4" /> No COD — for buyer & seller safety
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#8a6a14] mb-4">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#8a6a14]">
                <MessageCircle className="size-4 text-[#8a6a14]" />
                <span><span className="font-semibold">WhatsApp Ankush</span> · +91 70033 69589</span>
              </a>
            </li>
            <li>
              <a href={`tel:+91${BRAND.whatsappAlt.slice(2)}`} className="inline-flex items-center gap-2 hover:text-[#8a6a14]">
                <Phone className="size-4 text-[#8a6a14]" />
                <span><span className="font-semibold">Alternate</span> · +91 85830 25727</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:text-[#8a6a14]">
                <Mail className="size-4 text-[#8a6a14]" />
                <span>{BRAND.email}</span>
              </a>
            </li>
            <li>
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#8a6a14]">
                <Instagram className="size-4 text-[#8a6a14]" />
                <span>@checkmate.jersey</span>
              </a>
            </li>
            <li>
              <a href={BRAND.whatsappGroup} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#8a6a14]">
                <Users className="size-4 text-[#8a6a14]" />
                <span>Join our WhatsApp community</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#8a6a14] mb-4">Shipping & Policy</h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li>✓ Free standard shipping — all India</li>
            <li>✓ Fast delivery available · charge up to ₹100 (varies by city)</li>
            <li>✓ Order confirmed after UPI payment</li>
            <li>✓ Order updates directly on WhatsApp</li>
            <li>✗ No Cash-on-Delivery (safety policy)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/30">
        <div className="container-x py-5 text-xs text-neutral-600 flex flex-wrap gap-3 justify-between">
          <div>© {new Date().getFullYear()} CHECKMATE Jersey · All rights reserved.</div>
          <div className="text-[#8a6a14] font-semibold uppercase tracking-widest">Wear Your Passion</div>
        </div>
      </div>
    </footer>
  );
}
