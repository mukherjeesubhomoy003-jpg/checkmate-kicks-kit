import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { WorldCupSection } from "@/components/home/WorldCupSection";

export const Route = createFileRoute("/player-version")({
  head: () => ({
    meta: [
      { title: "Player Version Jerseys — CHECKMATE" },
      { name: "description", content: "Player-edition football jerseys. Match-grade fabric, federation badges. ₹999 plus distance-based shipping." },
      { property: "og:title", content: "CHECKMATE — Player Version Collection" },
      { property: "og:description", content: "Player-version jerseys ₹999 plus distance-based shipping." },
    ],
  }),
  component: PlayerVersionPage,
});

function PlayerVersionPage() {
  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#fa5400] transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>
      <WorldCupSection heading="Player Version" showBanner={false} />
    </div>
  );
}
