import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold">
            <span className="text-primary">CHECK</span>MATE
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium football gear engineered for performance. Built for athletes who never settle.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/category/$slug" params={{ slug: "jerseys" }}>Jerseys</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "shoes" }}>Shoes</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "footballs" }}>Footballs</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "gk-gloves" }}>Goalkeeper Gloves</Link></li>
            <li><Link to="/category/$slug" params={{ slug: "training" }}>Training</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li>Shipping & Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Drops, deals, and team news.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="you@email.com" className="flex-1 rounded-md bg-secondary/60 border border-border px-3 py-2 text-sm" />
            <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-x py-6 text-xs text-muted-foreground flex flex-wrap gap-3 justify-between">
          <div>© {new Date().getFullYear()} Checkmate Sports. All rights reserved.</div>
          <div>Made for athletes.</div>
        </div>
      </div>
    </footer>
  );
}
