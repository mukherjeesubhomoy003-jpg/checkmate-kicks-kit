import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type BulkCartItem = {
  id: string;            // unique row id (item+size)
  itemId: string;        // catalogue id (setXX / jXX / fXX)
  name: string;          // e.g. "Arsenal · Third Navy Emirates (Set)"
  image: string;
  price: number;
  size: string;
  quantity: number;
  category: string;      // "1st Grade Set", "Player Version" etc.
};

type Ctx = {
  items: BulkCartItem[];
  add: (item: Omit<BulkCartItem, "id">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "checkmate.bulk.v1";

export function BulkCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BulkCartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
    }
  }, [items, ready]);

  const value = useMemo<Ctx>(() => ({
    items,
    add: (it) => setItems((prev) => {
      const rowId = `${it.itemId}__${it.size}`;
      const idx = prev.findIndex((p) => p.id === rowId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + it.quantity };
        return next;
      }
      return [...prev, { ...it, id: rowId }];
    }),
    setQty: (id, qty) => setItems((p) => p.map((x) => x.id === id ? { ...x, quantity: Math.max(1, qty) } : x)),
    remove: (id) => setItems((p) => p.filter((x) => x.id !== id)),
    clear: () => setItems([]),
    count: items.reduce((a, b) => a + b.quantity, 0),
    subtotal: items.reduce((a, b) => a + b.price * b.quantity, 0),
  }), [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useBulkCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("useBulkCart must be inside BulkCartProvider");
  return v;
}
