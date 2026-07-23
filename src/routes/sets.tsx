import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trophy, ShoppingCart, Check, X } from "lucide-react";
import { SETS, SETS_PRICE, SETS_MRP, type SetItem } from "@/lib/sets";
import { OrderModal } from "@/components/order/OrderModal";
import { OrderGuide } from "@/components/OrderGuide";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import { useBulkCart } from "@/lib/bulk-cart";
import { toast } from "sonner";
import setsBanner from "@/assets/banners/sets.jpg.asset.json";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];
function totalStock(map: Record<string, Partial<Record<SizeKey, number>>> | undefined, id: string) {
  const row = map?.[id];
  if (!row) return undefined;
  return SIZES.reduce((s, k) => s + (row[k] ?? 0), 0);
}

export const Route = createFileRoute("/sets")({
  head: () => ({
    meta: [
      { title: "1st Grade Sets — Jersey + Shorts · CHECKMATE" },
      { name: "description", content: "Premium 1st Grade football sets — jersey + shorts kit combos at ₹699. Add to cart, order in bulk. Real Madrid, Barcelona, Manchester United, Liverpool, AC Milan, Arsenal, Japan and more." },
      { property: "og:title", content: "CHECKMATE — 1st Grade Sets" },
      { property: "og:description", content: "Complete kit sets · Jersey + Shorts · ₹699 · Bulk-order friendly · All-India delivery." },
    ],
  }),
  component: SetsPage,
});

function SetsPage() {
  const [active, setActive] = useState<SetItem | null>(null);
  const [addingTo, setAddingTo] = useState<SetItem | null>(null);
  const { data: stockMap } = useJerseySizeStock();
  const cart = useBulkCart();

  const list = SETS.filter((s) => {
    const t = totalStock(stockMap, s.id);
    return t === undefined || t > 0;
  });

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundImage: `url(${setsBanner.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="bg-gradient-to-r from-black/85 via-black/60 to-black/30">
          <div className="container-x py-10 md:py-16">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] bg-white/10 backdrop-blur text-white hover:bg-[#fa5400] transition">
              <ArrowLeft className="size-3.5" /> Back
            </Link>
            <div className="mt-6 max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 bg-[#fa5400] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Trophy className="size-3.5" /> 1st Grade · {list.length} Sets Live
              </div>
              <h1 className="mt-4 font-bebas text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
                1<span className="text-[#fa5400]">st</span> Grade <span className="text-[#fa5400]">Sets.</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-lg">
                Complete kit combos — <b>Jersey + Shorts</b>. Premium 1st-grade fabric, club & country editions.
                Flat <b className="text-[#fa5400]">₹{SETS_PRICE}</b> · MRP <span className="line-through opacity-70">₹{SETS_MRP}</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/bulk-cart" className="inline-flex items-center gap-2 rounded-none bg-white text-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#F1BF00] transition">
                  <ShoppingCart className="size-3.5" /> View Cart {cart.count > 0 && `· ${cart.count}`}
                </Link>
                <div className="inline-flex items-center gap-2 rounded-none border border-white/40 text-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Bulk Orders Welcome
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-x py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
              {list.map((s) => {
                const total = totalStock(stockMap, s.id);
                const low = typeof total === "number" && total > 0 && total <= 3;
                return (
                  <article key={s.id} className="group relative bg-[#f5f5f5] flex flex-col">
                    <div className="relative overflow-hidden bg-[#f5f5f5] cursor-pointer" onClick={() => setActive(s)}>
                      <div className="absolute right-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                        Set
                      </div>
                      {low && (
                        <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                          Only {total} left
                        </div>
                      )}
                      <div className="aspect-[4/5] w-full">
                        <img
                          src={s.image}
                          alt={`${s.team} ${s.tag} kit set`}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <div className="px-1 pt-2 pb-2 md:pt-3 flex-1">
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">
                        1st Grade Set
                      </div>
                      <h3 className="mt-0.5 font-bebas text-base md:text-xl leading-tight tracking-wide uppercase text-black line-clamp-2">
                        {s.team} · {s.tag}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-bebas text-base md:text-lg tracking-wide text-black">₹{SETS_PRICE}</span>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 line-through">₹{SETS_MRP}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setAddingTo(s)}
                      className="mx-1 mb-2 md:mb-3 inline-flex items-center justify-center gap-1.5 bg-black text-white px-2 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#fa5400] transition"
                    >
                      <ShoppingCart className="size-3.5" /> Add to Cart
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              Jersey + Shorts · All-India delivery · 7 days
            </div>
          </div>

          <div className="hidden lg:block">
            <OrderGuide />
          </div>
        </div>

        {/* Mobile guide */}
        <div className="lg:hidden mt-12 border-t border-black/10 pt-8">
          <OrderGuide />
        </div>
      </section>

      <OrderModal
        open={!!active}
        team={active ? `${active.team} · ${active.tag} (Set)` : ""}
        image={active?.image ?? ""}
        priceOverride={SETS_PRICE}
        hideKitSelector
        jerseyId={active?.id}
        onClose={() => setActive(null)}
      />

      {addingTo && (
        <AddToCartModal
          set={addingTo}
          stock={stockMap?.[addingTo.id]}
          onClose={() => setAddingTo(null)}
          onAdd={(size, qty) => {
            cart.add({
              itemId: addingTo.id,
              name: `${addingTo.team} · ${addingTo.tag} (Set)`,
              image: addingTo.image,
              price: SETS_PRICE,
              size,
              quantity: qty,
              category: "1st Grade Set",
            });
            toast.success(`Added to cart: ${addingTo.team} · ${size} × ${qty}`, {
              action: { label: "View Cart", onClick: () => { window.location.href = "/bulk-cart"; } },
            });
            setAddingTo(null);
          }}
        />
      )}
    </div>
  );
}

function AddToCartModal({
  set, stock, onAdd, onClose,
}: {
  set: SetItem;
  stock?: Partial<Record<SizeKey, number>>;
  onAdd: (size: SizeKey, qty: number) => void;
  onClose: () => void;
}) {
  const firstAvailable = SIZES.find((s) => (stock?.[s] ?? 0) > 0) ?? "L";
  const [size, setSize] = useState<SizeKey>(firstAvailable);
  const [qty, setQty] = useState(1);
  const max = stock?.[size] ?? 99;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">Add to Cart</div>
            <div className="font-bebas text-lg uppercase tracking-tight text-black leading-none mt-0.5">{set.team} · {set.tag}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100"><X className="size-4" /></button>
        </div>
        <div className="p-4 grid grid-cols-[100px_1fr] gap-4">
          <div className="rounded-lg overflow-hidden bg-neutral-100 border border-black/10">
            <img src={set.image} alt={set.team} className="w-full aspect-[4/5] object-cover" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Price</div>
            <div className="font-bebas text-2xl">₹{SETS_PRICE} <span className="text-[11px] font-normal text-neutral-400 line-through">₹{SETS_MRP}</span></div>

            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Size</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {SIZES.map((s) => {
                const left = stock?.[s];
                const out = stock !== undefined && (left ?? 0) <= 0;
                return (
                  <button
                    key={s}
                    disabled={out}
                    onClick={() => { setSize(s); setQty(1); }}
                    className={`min-w-[38px] px-2 py-1.5 text-xs font-bold rounded border transition ${
                      out ? "border-neutral-200 text-neutral-300 line-through cursor-not-allowed"
                        : size === s ? "bg-black text-white border-black"
                        : "border-black/20 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Quantity</div>
            <div className="mt-1 inline-flex items-center rounded-md border border-black/20">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5">−</button>
              <span className="px-3 text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(max, qty + 1))} className="px-3 py-1.5">+</button>
            </div>
            {stock && <div className="mt-1 text-[10px] text-neutral-500">{stock?.[size] ?? 0} in stock · size {size}</div>}
          </div>
        </div>
        <div className="border-t border-black/10 p-3 flex gap-2">
          <button onClick={onClose} className="flex-1 py-3 text-xs font-bold uppercase tracking-[0.18em] border border-black/15 rounded-md hover:bg-neutral-100">Cancel</button>
          <button
            onClick={() => onAdd(size, qty)}
            className="flex-[2] inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white rounded-md hover:bg-[#fa5400]"
          >
            <Check className="size-4" /> Add · ₹{SETS_PRICE * qty}
          </button>
        </div>
      </div>
    </div>
  );
}
