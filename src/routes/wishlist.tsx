import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — CHECKMATE" }, { name: "description", content: "Your saved items at CHECKMATE." }] }),
  component: () => (
    <div className="container-x py-20 text-center">
      <Heart className="mx-auto size-12 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold">Your wishlist</h1>
      <p className="text-muted-foreground mt-2">Sign in to save items across devices.</p>
      <Link to="/auth" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Sign in</Link>
    </div>
  ),
});
