import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  variantId: string | null;
  slug: string;
  name: string;
  image: string;
  price: number;
  variantLabel?: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, variantId: string | null) => void;
  setQty: (productId: string, variantId: string | null, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartContextValue | null>(null);
const KEY = "checkmate.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (item) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.productId === item.productId && p.variantId === item.variantId);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  };
  const remove: CartContextValue["remove"] = (productId, variantId) =>
    setItems((p) => p.filter((x) => !(x.productId === productId && x.variantId === variantId)));
  const setQty: CartContextValue["setQty"] = (productId, variantId, qty) =>
    setItems((p) =>
      p.map((x) =>
        x.productId === productId && x.variantId === variantId ? { ...x, quantity: Math.max(1, qty) } : x,
      ),
    );
  const clear = () => setItems([]);
  const count = items.reduce((a, b) => a + b.quantity, 0);
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
}
