import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PosterDrop } from "@/components/home/PosterDrop";

export const Route = createFileRoute("/posters")({
  head: () => ({
    meta: [
      { title: "Wall Posters — CHECKMATE Legend Series" },
      { name: "description", content: "HD-printed football legend wall posters. ₹99 + shipping. Ronaldo, Mbappé, Neymar." },
      { property: "og:title", content: "CHECKMATE — Wall Poster Legend Series" },
      { property: "og:description", content: "HD wall posters · ₹99 + shipping · All-India delivery." },
    ],
  }),
  component: PostersPage,
});

function PostersPage() {
  return (
    <div>
      <div className="container-x pt-5">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white hover:bg-[#fa5400] transition">
          <ArrowLeft className="size-3.5" /> Back
        </Link>
      </div>
      <PosterDrop />
    </div>
  );
}
