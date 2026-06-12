import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart-context";
import { Logo } from "./Logo";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/category/$slug", params: { slug: "jerseys" }, label: "Jerseys" },
  { to: "/category/$slug", params: { slug: "shoes" }, label: "Shoes" },
  { to: "/category/$slug", params: { slug: "footballs" }, label: "Footballs" },
  { to: "/category/$slug", params: { slug: "gk-gloves" }, label: "Gloves" },
  { to: "/category/$slug", params: { slug: "training" }, label: "Training" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_, s) => setAuthed(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-6">
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link to="/" className="flex items-center gap-2" aria-label="Checkmate home">
          <Logo className="h-10 w-auto bg-white/95 rounded-md px-2 py-1" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to as never}
              params={(n as { params?: Record<string, string> }).params as never}
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link to="/shop" className="hidden sm:inline-flex p-2 hover:text-primary" aria-label="Search">
            <Search className="size-5" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:text-primary" aria-label="Wishlist">
            <Heart className="size-5" />
          </Link>
          <Link to={authed ? "/account" : "/auth"} className="p-2 hover:text-primary" aria-label="Account">
            <User className="size-5" />
          </Link>
          <Link to="/cart" className="relative p-2 hover:text-primary" aria-label="Cart">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-x flex flex-col py-3 gap-1">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to as never}
                params={(n as { params?: Record<string, string> }).params as never}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
