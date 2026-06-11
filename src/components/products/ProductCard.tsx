import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { inr, firstImage } from "@/lib/format";

export type ProductCardItem = {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  price: number | string;
  discount_price?: number | string | null;
  images: unknown;
  rating_avg?: number | string | null;
  is_new?: boolean | null;
  is_bestseller?: boolean | null;
};

export function ProductCard({ p }: { p: ProductCardItem }) {
  const price = Number(p.price);
  const discount = p.discount_price ? Number(p.discount_price) : null;
  const off = discount ? Math.round(((price - discount) / price) * 100) : 0;
  return (
    <Link
      to="/product/$slug"
      params={{ slug: p.slug }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/60 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <img
          src={firstImage(p.images)}
          alt={p.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {p.is_new && <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">NEW</span>}
          {p.is_bestseller && <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">BESTSELLER</span>}
          {off > 0 && <span className="rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">-{off}%</span>}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        {p.brand && <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</div>}
        <div className="font-semibold leading-snug line-clamp-2">{p.name}</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="font-bold">{inr(discount ?? price)}</div>
          {discount && <div className="text-sm text-muted-foreground line-through">{inr(price)}</div>}
        </div>
        {Number(p.rating_avg) > 0 && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" /> {Number(p.rating_avg).toFixed(1)}
          </div>
        )}
      </div>
    </Link>
  );
}
