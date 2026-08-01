import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, ShoppingCart, Heart } from "lucide-react";
import { CLUB_EMB, CLUB_EMB_PRICE, CLUB_EMB_MRP, type ClubEmb } from "@/lib/club-emb";
import { OrderModal } from "@/components/order/OrderModal";
import { OrderGuide } from "@/components/OrderGuide";
import { AddToCartModal } from "@/components/AddToCartModal";
import { RotatingImage } from "@/components/RotatingImage";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import { useBulkCart } from "@/lib/bulk-cart";
import { toast } from "sonner";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/club-emb")({
  head: () => ({
    meta: [
      { title: "Club Embroidery 2026/27 — Premium Stitched Kits · CHECKMATE" },
      { name: "description", content: "Club Embroidery collection — latest 2026/27 club season kits with premium embroidery crests & sponsors. ₹450 flat, no shipping charges." },
      { property: "og:title", content: "CHECKMATE — Club Embroidery 2026/27" },
      { property: "og:description", content: "Premium embroidery quality · latest 2026/27 club season · ₹450 only, no shipping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClubEmbPage,
});

function ClubEmbPage() {
  const [active, setActive] = useState<ClubEmb | null>(null);
  const [addingTo, setAddingTo] = useState<ClubEmb | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();
  const list = CLUB_EMB.filter((j) => {
    const t = totalStock(stockMap, j.id);
    return t === undefined || t > 0;
  });

  return (
    <div className="bg-white">
      <div className="bg-neutral-950 text-white">
        <div className="container-x py-10 md:py-16">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-white/10 text-white hover:bg-[#3B82F6] transition">
            <ArrowLeft className="size-3.5" /> Back
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/50 bg-[#3B82F6]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#93C5FD]">
              <Sparkles className="size-3.5" /> Latest 2026/27 Club Season
            </div>
            <h1 className="mt-4 font-bebas text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              Club{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] via-white to-[#3B82F6] bg-clip-text text-transparent">
                Embroidery.
              </span>
            </h1>
            <ul className="mt-4 space-y-1.5 text-sm text-white/80">
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#3B82F6]" /> Premium embroidery quality</li>
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#3B82F6]" /> Latest 2026/27 club season</li>
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-[#3B82F6]" /> ₹{CLUB_EMB_PRICE} only · no shipping charges</li>
            </ul>
            <Link to="/bulk-cart" className="mt-5 inline-flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition">
              <ShoppingCart className="size-3.5" /> View Cart {cart.count > 0 && `· ${cart.count}`}
            </Link>
          </div>
        </div>
      </div>

      <section className="container-x py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {list.map((j) => {
                const total = totalStock(stockMap, j.id);
                const low = typeof total === "number" && total > 0 && total <= 3;
                return (
                  <article key={j.id} className="group relative bg-[#f5f5f5] flex flex-col">
                    <div className="relative overflow-hidden bg-[#f5f5f5] cursor-pointer" onClick={() => setActive(j)}>
                      <div className="absolute right-2 top-2 z-30 bg-[#3B82F6] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                        Embroidery
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-30 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <RotatingImage images={j.gallery} alt={`${j.team} ${j.tag} club embroidery jersey`} />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#3B82F6]">Club · 2026/27</div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                        {j.team} · {j.tag}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{CLUB_EMB_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{CLUB_EMB_MRP}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddingTo(j)}
                      className="mx-1 mb-2 md:mb-3 inline-flex items-center justify-center gap-1.5 bg-black text-white px-2 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#3B82F6] transition"
                    >
                      <ShoppingCart className="size-3.5" /> Add to Cart
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              No shipping charges · All-India delivery
            </div>
          </div>

          <div className="hidden lg:block">
            <OrderGuide />
          </div>
        </div>

        <div className="lg:hidden mt-12 border-t border-black/10 pt-8">
          <OrderGuide />
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} · ${active.tag} · Club Embroidery` : ""}
        image={active?.image ?? ""}
        priceOverride={CLUB_EMB_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        category="Club Embroidery"
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          item={{
            id: addingTo.id,
            title: `${addingTo.team} · ${addingTo.tag}`,
            image: addingTo.image,
            price: CLUB_EMB_PRICE,
            mrp: CLUB_EMB_MRP,
            category: "Club Embroidery",
          }}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={({ size, qty, name, itemId }) => {
            cart.add({
              itemId,
              name: `${name} · Club Embroidery`,
              image: addingTo.image,
              price: CLUB_EMB_PRICE,
              size,
              quantity: qty,
              category: "Club Embroidery",
            });
            toast.success(`Added to cart: ${name} · ${size} × ${qty}`, {
              action: { label: "View Cart", onClick: () => { window.location.href = "/bulk-cart"; } },
            });
            setAddingTo(null);
          }}
        />
      )}
    </div>
  );
}
