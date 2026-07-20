import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, MessageCircle, IndianRupee, Banknote, Trophy, Star, Flame } from "lucide-react";
import { FeaturedDrop } from "@/components/home/FeaturedDrop";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { HappyCustomers } from "@/components/home/HappyCustomers";
import { ShareBanner } from "@/components/home/ShareBanner";
import { BRAND } from "@/components/order/OrderModal";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHECKMATE Jersey — Player, Fan, Shorts & Jackets" },
      { name: "description", content: "Authentic football jerseys · Player ₹850 · Fan ₹750 · Shorts & Jackets. Free shipping across India. Order on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — Football Jerseys & Merch" },
      { property: "og:description", content: "Player, Fan, Shorts, Jackets · Free all-India shipping · Order on WhatsApp." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* WC FINAL — Today */}
      <div className="relative z-[3] bg-black text-white overflow-hidden border-b border-[#F1BF00]/40">
        <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(90deg,#AA151B 0%,#F1BF00 50%,#AA151B 100%)" }} />
        <div className="container-x relative flex items-center justify-center gap-2 sm:gap-3 py-2 text-center">
          <Trophy className="size-4 text-[#F1BF00]" />
          <span className="font-bebas text-sm sm:text-base tracking-[0.2em] uppercase">
            <span className="text-[#F1BF00]">¡Campeones!</span> · <span className="text-white">Spain</span> are <span className="text-[#F1BF00]">World Champions 🏆</span>
          </span>
          <Star className="size-3.5 text-[#F1BF00] fill-[#F1BF00]" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a0508] font-outfit">
        <HeroSlideshow />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#1a0508] via-[#1a0508]/70 to-transparent z-[1]" />
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(circle at 72% 50%, rgba(241,191,0,0.22), transparent 55%)" }} />

        <div className="container-x relative z-[2] grid grid-cols-5 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center py-14 sm:py-20 md:py-28">
          <div className="col-span-3 lg:col-span-1 space-y-5 sm:space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#F1BF00]/60 bg-gradient-to-r from-[#AA151B]/40 via-[#F1BF00]/15 to-[#AA151B]/40 backdrop-blur-md">
              <Trophy className="size-3.5 text-[#F1BF00]" />
              <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em]">Champions · La Roja 🇪🇸</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-bebas text-white leading-[0.88] tracking-tight text-[32px] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[128px]">
                SPAIN LIFT
                <br />
                <span className="bg-gradient-to-r from-[#AA151B] via-[#F1BF00] to-[#AA151B] bg-clip-text text-transparent">THE CUP.</span>
              </h1>
              <p className="max-w-md text-zinc-200/90 text-sm sm:text-lg leading-relaxed">
                Champions kits flying out. Spain Player ₹1300 · Fan ₹1050 · Champion editions live now.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a href="#shop"
                className="px-5 sm:px-8 py-3 sm:py-4 bg-[#F1BF00] text-black font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[11px] sm:text-sm transition-all duration-300 hover:bg-white hover:-translate-y-0.5 inline-flex items-center gap-2">
                <Trophy className="size-4" /> Shop Champions Kits <ArrowRight className="size-4" />
              </a>
              <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
                className="group px-5 sm:px-8 py-3 sm:py-4 border border-white/40 text-white font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[11px] sm:text-sm hover:bg-white/10 transition-all inline-flex items-center gap-2">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>

        </div>

        <div className="relative z-[3] w-full border-y border-[#F1BF00]/40 bg-black/85 backdrop-blur-md overflow-hidden">
          <div className="animate-hero-marquee py-3">
            {Array.from({ length: 2 }).flatMap((_, loop) => [
              { k: "🏆 SPAIN CHAMPIONS", v: "2026" },
              { k: "SPAIN PV", v: "₹1300" },
              { k: "SPAIN FAN", v: "₹1050" },
              { k: "SPAIN CHAMPION EDITION", v: "LIVE" },
              { k: "ARGENTINA PV", v: "₹1300" },
              { k: "ARG FULL SLEEVE", v: "₹1800" },
              { k: "1ST GRADE SETS", v: "₹699" },
            ].map((it, i) => (
              <span key={`${loop}-${i}`} className="inline-flex items-center gap-4 px-8 whitespace-nowrap">
                <span className="text-white font-bold text-[11px] sm:text-xs uppercase tracking-[0.22em]">{it.k}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-[#F1BF00] font-bebas tracking-[0.14em] text-lg">{it.v}</span>
                <Star className="size-3 text-[#F1BF00] fill-[#F1BF00]" />
              </span>
            )))}
          </div>
        </div>
      </section>



      {/* Perks */}
      <section className="border-b border-black/10 bg-white relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 flex">
          <div className="flex-1 bg-[#AA151B]" /><div className="flex-1 bg-[#F1BF00]" /><div className="flex-1 bg-[#AA151B]" />
        </div>
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-5 md:py-6 text-xs md:text-sm">
          {[
            { i: Trophy, t: "Spain — 2026 World Champions 🏆", c: "text-[#F1BF00]" },
            { i: Truck, t: "Free shipping · all India", c: "text-[#AA151B]" },
            { i: Flame, t: "Champion kits shipping today", c: "text-[#F1BF00]" },
            { i: ShieldCheck, t: "UPI only · no COD", c: "text-black" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-2 text-neutral-700">
              <x.i className={`size-4 shrink-0 ${x.c}`} /> <span className="truncate">{x.t}</span>
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#75AADB] via-[#F1BF00] to-[#AA151B] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]"><Trophy className="size-3"/> How it works</div>
          <h2 className="mt-4 font-bebas text-4xl md:text-7xl uppercase leading-[0.9] tracking-tight">Order in three steps.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { n: "01", t: "Pick your jersey", d: "Choose team, kit, size and quantity. Add name & number if you like.", icon: ShieldCheck },
            { n: "02", t: "Pay via UPI QR", d: "Scan the QR shown after order details. UPI/GPay/PhonePe/Paytm. No COD.", icon: IndianRupee },
            { n: "03", t: "Confirm on WhatsApp", d: "Tap WhatsApp — details sent automatically. Share payment screenshot. We ship.", icon: MessageCircle },
          ].map((s) => (
            <div key={s.n} className="relative bg-[#f5f5f5] p-5 md:p-6 border-t-2 border-black">
              <div className="font-bebas text-5xl md:text-6xl leading-none bg-gradient-to-r from-[#75AADB] to-[#AA151B] bg-clip-text text-transparent">{s.n}</div>
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
