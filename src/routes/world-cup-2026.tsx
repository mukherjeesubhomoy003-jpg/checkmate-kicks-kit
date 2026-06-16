import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { WorldCupSection } from "@/components/home/WorldCupSection";

export const Route = createFileRoute("/world-cup-2026")({
  head: () => ({
    meta: [
      { title: "World Cup 2026 Collection — All 46 Player-Edition Jerseys · CHECKMATE" },
      { name: "description", content: "Browse the full CHECKMATE World Cup 2026 player-edition catalogue. Home ₹1000 · Away ₹1100 · Free all-India shipping · Order on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — World Cup 2026 Full Collection" },
      { property: "og:description", content: "All 46 player-edition football jerseys. Match-grade fabric, federation badges. Order on WhatsApp." },
    ],
  }),
  component: WorldCupPage,
});

function WorldCupPage() {
  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37", boxShadow: "0 10px 24px -14px rgba(0,0,0,0.6)" }}>
          <ArrowLeft className="size-3.5" /> <Home className="size-3.5" /> Back to Home
        </Link>
      </div>
      <WorldCupSection heading="Full" showBanner />
      <div className="container-x pb-10 -mt-4 text-center">
        <Link to="/"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] border border-gold/60 hover:border-[#8a6a14]">
          <Home className="size-3.5" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
