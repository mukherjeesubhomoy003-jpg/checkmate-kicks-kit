import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { BRAND } from "@/components/order/OrderModal";

export const Route = createFileRoute("/shorts")({
  head: () => ({
    meta: [
      { title: "Football Shorts — Coming Soon · CHECKMATE" },
      { name: "description", content: "Player-edition football shorts landing soon at CHECKMATE. Get notified on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — Shorts Coming Soon" },
      { property: "og:description", content: "Player-edition shorts drop coming soon." },
    ],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#fa5400] transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>

      <section className="container-x py-20 md:py-32 min-h-[60vh] grid place-items-center text-center">
        <div>
          <div className="inline-block bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">
            Dropping Soon
          </div>
          <h1 className="mt-5 font-bebas text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.88] tracking-tight">
            Shorts.<br />
            <span className="text-[#fa5400]">Coming Soon.</span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-neutral-600">
            Match-grade training & match shorts are in production. Tap WhatsApp to be first in line.
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsappPrimary}?text=${encodeURIComponent("Hi CHECKMATE, notify me when Shorts drop!")}`}
            target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] hover:bg-[#fa5400] transition"
          >
            <MessageCircle className="size-4" /> Notify me on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
