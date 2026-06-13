import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, MapPin, Zap, MessageCircle, IndianRupee, Banknote } from "lucide-react";
import { WorldCupSection } from "@/components/home/WorldCupSection";
import { BRAND } from "@/components/order/OrderModal";
import heroBg from "@/assets/hero-football-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHECKMATE Jersey — Player Edition World Cup 2026 Collection" },
      { name: "description", content: "Authentic player-edition football jerseys. World Cup 2026 collection. Home ₹1000 / Away ₹1100. Free shipping across India. Order on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — Player Edition World Cup 2026" },
      { property: "og:description", content: "Player-edition jerseys · Home ₹1000 · Away ₹1100 · Free all-India shipping · Order on WhatsApp." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero — Ivory & Gold */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbf7ee] to-white" />
        <div aria-hidden className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 15% 20%, #f4d77a 0, transparent 40%), radial-gradient(circle at 85% 80%, #d4af37 0, transparent 45%)",
        }} />
        <div className="container-x relative py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", color: "#8a6a14", border: "1px solid #e6c976" }}>
            <Zap className="size-3" /> World Cup 2026 · Player Edition
          </div>
          <h1 className="mt-6 font-display text-6xl md:text-8xl font-bold leading-[0.92] tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#1a1a1a 0%,#1a1a1a 55%,#8a6a14 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Wear Your
            </span>
            <br />
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Passion.
            </span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-neutral-600">
            Authentic player-edition jerseys from the world's top federations.
            Hand-picked, shipped across India, delivered with care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#collection" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37", boxShadow: "0 1px 0 #d4af37 inset, 0 18px 40px -16px rgba(184,134,43,0.6)" }}>
              View Collection <ArrowRight className="size-4" />
            </a>
            <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border border-gold/60 bg-white hover:bg-[#fbf4dd]">
              <MessageCircle className="size-4 text-[#8a6a14]" /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-10 inline-flex items-center gap-5 rounded-full bg-white/90 border border-gold/40 px-5 py-2.5 shadow-luxe">
            <div className="text-xs"><span className="text-[#8a6a14] font-bold uppercase tracking-wider">Home</span> <span className="text-neutral-700 font-semibold">₹1000</span></div>
            <span className="h-4 w-px bg-gold/40" />
            <div className="text-xs"><span className="text-[#8a6a14] font-bold uppercase tracking-wider">Away</span> <span className="text-neutral-700 font-semibold">₹1100</span></div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-gold/30 bg-white">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-sm">
          {[
            { i: Truck, t: "Free shipping · all India" },
            { i: Zap, t: "Fast delivery · up to ₹100" },
            { i: MapPin, t: "Delivered to your doorstep" },
            { i: ShieldCheck, t: "No COD — UPI only" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-700">
              <x.i className="size-4 text-[#8a6a14]" /> {x.t}
            </div>
          ))}
        </div>
      </section>

      {/* World Cup Collection */}
      <WorldCupSection />

      {/* How to order */}
      <section id="how" className="container-x py-20">
        <div className="text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">How it works</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Order in three steps</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Pick your jersey", d: "Choose team, Home or Away kit, size and quantity. Optional name & number on back.", icon: ShieldCheck },
            { n: "02", t: "Pay via UPI QR", d: "Scan the QR shown after order details. UPI/GPay/PhonePe/Paytm. No COD — for safety.", icon: IndianRupee },
            { n: "03", t: "Confirm on WhatsApp", d: "Tap the WhatsApp button — your order details are sent automatically. Share payment screenshot. We ship.", icon: MessageCircle },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl bg-white border border-gold/40 p-6 shadow-luxe">
              <div className="text-[10px] font-bold tracking-[0.3em] text-[#8a6a14]">STEP {s.n}</div>
              <s.icon className="mt-3 size-7 text-[#8a6a14]" />
              <div className="mt-4 font-display text-2xl font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-xs text-neutral-500">
          <Banknote className="inline size-3.5 mr-1 text-[#8a6a14]" />
          After payment, your order is dispatched and tracked directly via our business WhatsApp.
        </div>
      </section>
    </div>
  );
}
