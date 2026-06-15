import { createFileRoute } from "@tanstack/react-router";
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
  return <WorldCupSection heading="Full" showBanner />;
}
