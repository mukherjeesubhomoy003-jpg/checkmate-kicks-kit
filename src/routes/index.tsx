import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, MapPin, Zap, MessageCircle, IndianRupee, Banknote } from "lucide-react";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { HappyCustomers } from "@/components/home/HappyCustomers";
import { ShareBanner } from "@/components/home/ShareBanner";
import { BRAND } from "@/components/order/OrderModal";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import heroJersey from "@/assets/argentina-messi.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHECKMATE Jersey — Player, Fan, Shorts & Wall Posters" },
      { name: "description", content: "Authentic football jerseys · Player ₹850 · Fan ₹750 · Wall Posters ₹99. Free shipping across India. Order on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — Football Jerseys & Merch" },
      { property: "og:description", content: "Player, Fan, Shorts, Posters · Free all-India shipping · Order on WhatsApp." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0a0a] font-outfit">
        <HeroSlideshow />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-[1]" />
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(circle at 72% 50%, rgba(250,84,0,0.14), transparent 55%)" }} />

        <div className="container-x relative z-[2] grid grid-cols-5 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center py-14 sm:py-20 md:py-28">
          <div className="col-span-3 lg:col-span-1 space-y-5 sm:space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/25 bg-white/5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#fa5400] animate-pulse" />
              <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em]">World Cup 2026 · Player Edition</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-bebas text-white leading-[0.88] tracking-tight text-[32px] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[128px]">
                WEAR YOUR
                <br />
                <span className="text-[#fa5400]">PASSION.</span>
              </h1>
              <p className="max-w-md text-zinc-300/90 text-sm sm:text-lg leading-relaxed">
                Player ₹850 · Fan ₹750 · Wall Posters ₹99. All jerseys, all teams.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a href="#shop"
                className="px-5 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[11px] sm:text-sm transition-all duration-300 hover:bg-[#fa5400] hover:text-white hover:-translate-y-0.5 inline-flex items-center gap-2">
                Shop Now <ArrowRight className="size-4" />
              </a>
              <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
                className="group px-5 sm:px-8 py-3 sm:py-4 border border-white/40 text-white font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[11px] sm:text-sm hover:bg-white/10 transition-all inline-flex items-center gap-2">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative col-span-2 lg:col-span-1 lg:order-last mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <div className="relative z-10 w-full aspect-square border-2 border-white/25 p-3 sm:p-5 rotate-2 lg:rotate-3 bg-black/30">
              <div className="relative size-full overflow-hidden bg-neutral-200 group">
                <img
                  src={heroJersey.url}
                  alt="CHECKMATE player edition jersey detail"
                  className="size-full object-cover scale-105 transition-transform duration-[1200ms] group-hover:scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 right-0 bg-[#fa5400] text-white px-3 sm:px-5 py-2 sm:py-3 pr-7 sm:pr-10 clip-slant-tag">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] opacity-90">Special Offer</p>
                  <p className="font-bebas text-lg sm:text-2xl tracking-[0.12em] leading-none mt-0.5">₹850 · ALL TEAMS</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[3] w-full border-y border-white/15 bg-black/80 backdrop-blur-md overflow-hidden">
          <div className="animate-hero-marquee py-3">
            {Array.from({ length: 2 }).flatMap((_, loop) => [
              { k: "PLAYER VERSION", v: "₹850" },
              { k: "FAN VERSION", v: "₹750" },
              { k: "WALL POSTERS", v: "₹99" },
              { k: "FULL SLEEVE", v: "₹1200" },
              { k: "PRACTICE PV", v: "₹999" },
              { k: "BRASIL AWAY DEAL", v: "₹800" },
            ].map((it, i) => (
              <span key={`${loop}-${i}`} className="inline-flex items-center gap-4 px-8 whitespace-nowrap">
                <span className="text-white font-bold text-[11px] sm:text-xs uppercase tracking-[0.22em]">{it.k}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-[#fa5400] font-bebas tracking-[0.14em] text-lg">{it.v}</span>
                <span className="text-white/25 pl-4">◆</span>
              </span>
            )))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-black/10 bg-white">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-5 md:py-6 text-xs md:text-sm">
          {[
            { i: Truck, t: "Free shipping · all India" },
            { i: Zap, t: "Within 7 days delivery" },
            { i: MapPin, t: "Delivered to your doorstep" },
            { i: ShieldCheck, t: "No COD — UPI only" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-700">
              <x.i className="size-4 text-[#fa5400] shrink-0" /> <span className="truncate">{x.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Special Editions */}
      <FeaturedDrop />

      {/* 4 Category Tiles */}
      <CategoryTiles />

      {/* Happy customers */}
      <HappyCustomers />

      {/* Share */}
      <ShareBanner />

      {/* How it works */}
      <section id="how" className="container-x py-16 md:py-20">
        <div className="text-center">
          <div className="inline-block bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">How it works</div>
          <h2 className="mt-4 font-bebas text-4xl md:text-7xl uppercase leading-[0.9] tracking-tight">Order in three steps.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { n: "01", t: "Pick your jersey", d: "Choose team, kit, size and quantity. Add name & number if you like.", icon: ShieldCheck },
            { n: "02", t: "Pay via UPI QR", d: "Scan the QR shown after order details. UPI/GPay/PhonePe/Paytm. No COD.", icon: IndianRupee },
            { n: "03", t: "Confirm on WhatsApp", d: "Tap WhatsApp — details sent automatically. Share payment screenshot. We ship.", icon: MessageCircle },
          ].map((s) => (
            <div key={s.n} className="relative bg-[#f5f5f5] p-5 md:p-6 border-t-2 border-black">
              <div className="font-bebas text-5xl md:text-6xl leading-none text-[#fa5400]">{s.n}</div>
              <s.icon className="mt-3 size-6 text-black" />
              <div className="mt-2 font-bebas text-xl md:text-2xl uppercase tracking-wide">{s.t}</div>
              <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-xs text-neutral-500 px-4">
          <Banknote className="inline size-3.5 mr-1" />
          After payment, your order is dispatched and tracked directly on our business WhatsApp.
        </div>
      </section>
    </div>
  );
}
