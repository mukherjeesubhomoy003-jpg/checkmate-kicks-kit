import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shirt, ShoppingCart, Heart } from "lucide-react";
import { FS_RETRO, FS_RETRO_PRICE, FS_RETRO_MRP, type FsRetro } from "@/lib/fs-retro";
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

export const Route = createFileRoute("/fs-retro")({
  head: () => ({
    meta: [
      { title: "Full Sleeve Retro & New Jerseys — CHECKMATE" },
      { name: "description", content: "Full sleeve retro & latest club/country jerseys with premium embroidery quality. Real Madrid, Barcelona, Santos, Arsenal, Man United & Portugal." },
      { property: "og:title", content: "CHECKMATE — Full Sleeves Retro & New" },
      { property: "og:description", content: "Premium embroidery quality · retro & latest club/country full sleeve jerseys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FsRetroPage,
});

function FsRetroPage() {
  const [active, setActive] = useState<FsRetro | null>(null);
  const [addingTo, setAddingTo] = useState<FsRetro | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();
  const list = FS_RETRO.filter((j) => {
    const t = totalStock(stockMap, j.id);
    return t === undefined || t > 0;
  });

  return (
    <div className="bg-white">
      <div className="bg-neutral-950 text-white">
        <div className="container-x py-10 md:py-16">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-white/10 text-white hover:bg-white hover:text-black transition">
            <ArrowLeft className="size-3.5" /> Back
          </Link>
          <div className="mt-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90">
              <Shirt className="size-3.5" /> Retro & Latest · Full Sleeves
            </div>
            <h1 className="mt-4 font-bebas text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
              Full Sleeves{" "}
              <span className="bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent">
                Retro & New.
              </span>
            </h1>
            <ul className="mt-4 space-y-1.5 text-sm text-white/80">
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-white" /> Premium embroidery quality</li>
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-white" /> Retro &amp; latest club/country jerseys available</li>
              <li className="flex items-center gap-2"><Heart className="size-3.5 text-white" /> Full sleeves edition · ₹{FS_RETRO_PRICE}</li>
            </ul>
            <Link to="/bulk-cart" className="mt-5 inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#fa5400] hover:text-white transition">
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
                      <div className="absolute right-2 top-2 z-30 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                        {j.era}
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-30 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <RotatingImage images={j.gallery} alt={`${j.team} ${j.tag} full sleeve jersey`} />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">Full Sleeve · Embroidery</div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                        {j.team} · {j.tag}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{FS_RETRO_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{FS_RETRO_MRP}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddingTo(j)}
                      className="mx-1 mb-2 md:mb-3 inline-flex items-center justify-center gap-1.5 bg-black text-white px-2 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#fa5400] transition"
                    >
                      <ShoppingCart className="size-3.5" /> Add to Cart
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Free shipping · All-India delivery
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
        team={active ? `${active.team} · ${active.tag} · Full Sleeve` : ""}
        image={active?.image ?? ""}
        priceOverride={FS_RETRO_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        category="Full Sleeve Retro"
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          item={{
            id: addingTo.id,
            title: `${addingTo.team} · ${addingTo.tag}`,
            image: addingTo.image,
            price: FS_RETRO_PRICE,
            mrp: FS_RETRO_MRP,
            category: "Full Sleeve Retro",
          }}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={({ size, qty, name, itemId }) => {
            cart.add({
              itemId,
              name: `${name} · Full Sleeve Retro`,
              image: addingTo.image,
              price: FS_RETRO_PRICE,
              size,
              quantity: qty,
              category: "Full Sleeve Retro",
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
