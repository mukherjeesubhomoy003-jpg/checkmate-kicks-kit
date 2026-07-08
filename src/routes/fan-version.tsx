import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy } from "lucide-react";
import { FAN_JERSEYS, FAN_PRICE, FAN_MRP, type FanJersey } from "@/lib/fan-jerseys";
import { OrderModal } from "@/components/order/OrderModal";

export const Route = createFileRoute("/fan-version")({
  head: () => ({
    meta: [
      { title: "Fan Version Jerseys — CHECKMATE" },
      { name: "description", content: "Fan-version football jerseys. Everyday supporter kits. ₹750 flat, all teams. Free all-India shipping." },
      { property: "og:title", content: "CHECKMATE — Fan Version Collection" },
      { property: "og:description", content: "All fan-version jerseys ₹750 · Free shipping across India." },
    ],
  }),
  component: FanPage,
});

function FanPage() {
  const [active, setActive] = useState<FanJersey | null>(null);
  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#fa5400] transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>

      <section className="container-x py-10 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
            <Trophy className="size-3.5" /> {FAN_JERSEYS.length} Fan Version Kits
          </div>
          <h1 className="mt-4 font-bebas text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight">
            Fan <span className="text-[#fa5400]">Version.</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-600">
            Everyday supporter kits · Comfortable fabric · <b>₹{FAN_PRICE} flat</b> · Free all-India shipping.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
          {FAN_JERSEYS.map((j) => (
            <article
              key={j.id}
              className="group relative bg-[#f5f5f5] cursor-pointer"
              onClick={() => setActive(j)}
            >
              <div className="relative overflow-hidden bg-[#f5f5f5]">
                <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                  Fan · -50%
                </div>
                <div className="aspect-[4/5] w-full">
                  <img
                    src={j.image}
                    alt={`${j.team} ${j.tag} fan version jersey`}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="px-1 pt-2 pb-3 md:pt-3 md:pb-4">
                <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                  Fan Version
                </div>
                <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                  {j.team} {j.tag}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{FAN_PRICE}</span>
                  <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{FAN_MRP}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          Free shipping · All-India delivery · 7 days
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} ${active.tag} · Fan Version` : ""}
        image={active?.image ?? ""}
        priceOverride={FAN_PRICE}
        hideKitSelector
        onClose={() => setActive(null)}
      />
    </div>
  );
}
