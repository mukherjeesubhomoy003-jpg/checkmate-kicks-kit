import { useState } from "react";
import { X, Check } from "lucide-react";
import type { SizeKey } from "@/lib/jersey-size-stock";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];

export type AddToCartItem = {
  id: string;
  title: string;         // e.g. "Real Madrid · Home"
  image: string;
  price: number;
  mrp?: number;
  category: string;      // "Player Version", "Fan", "Jacket", etc.
  /** Show Home/Away kit selector (adds " · Home"/" · Away" to name). */
  showKit?: boolean;
  /** Restrict available sizes (default S–XXL). */
  sizes?: SizeKey[];
};

export function AddToCartModal({
  item, stock, onAdd, onClose,
}: {
  item: AddToCartItem;
  stock?: Partial<Record<SizeKey, number>>;
  onAdd: (payload: { size: SizeKey; qty: number; kit?: "Home" | "Away"; name: string; itemId: string }) => void;
  onClose: () => void;
}) {
  const sizeOptions = item.sizes ?? SIZES;
  const firstAvailable = sizeOptions.find((s) => (stock?.[s] ?? 1) > 0) ?? sizeOptions[0];
  const [size, setSize] = useState<SizeKey>(firstAvailable);
  const [qty, setQty] = useState(1);
  const [kit, setKit] = useState<"Home" | "Away">("Home");
  const max = stock?.[size] ?? 99;

  const finalName = item.showKit ? `${item.title} · ${kit}` : item.title;
  const finalItemId = item.showKit ? `${item.id}__${kit}` : `${item.id}__one`;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">Add to Cart</div>
            <div className="font-bebas text-lg uppercase tracking-tight text-black leading-none mt-0.5">{item.title}</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100"><X className="size-4" /></button>
        </div>

        <div className="p-4 grid grid-cols-[100px_1fr] gap-4">
          <div className="rounded-lg overflow-hidden bg-neutral-100 border border-black/10">
            <img src={item.image} alt={item.title} className="w-full aspect-[4/5] object-cover" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Price</div>
            <div className="font-bebas text-2xl">
              ₹{item.price}
              {item.mrp && <span className="text-[11px] font-normal text-neutral-400 line-through ml-1.5">₹{item.mrp}</span>}
            </div>

            {item.showKit && (
              <>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Kit</div>
                <div className="mt-1 flex gap-1.5">
                  {(["Home", "Away"] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setKit(k)}
                      className={`px-3 py-1.5 text-xs font-bold rounded border transition ${
                        kit === k ? "bg-black text-white border-black" : "border-black/20 hover:border-black"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Size</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {sizeOptions.map((s) => {
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
            onClick={() => onAdd({ size, qty, kit: item.showKit ? kit : undefined, name: finalName, itemId: finalItemId })}
            className="flex-[2] inline-flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.18em] bg-black text-white rounded-md hover:bg-[#fa5400]"
          >
            <Check className="size-4" /> Add · ₹{item.price * qty}
          </button>
        </div>
      </div>
    </div>
  );
}
