import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  variant_id?: string | null;
  variant_size?: string | null;
  sku?: string | null;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string, variantId?: string | null) => void;
  setQty: (id: string, qty: number, variantId?: string | null) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "llumi.cart.v1";

const sameLine = (a: CartItem, id: string, variantId?: string | null) =>
  a.id === id && (a.variant_id ?? null) === (variantId ?? null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (item, qty = 1) =>
      setItems((prev) => {
        const found = prev.find((p) => sameLine(p, item.id, item.variant_id));
        if (found)
          return prev.map((p) => (sameLine(p, item.id, item.variant_id) ? { ...p, quantity: p.quantity + qty } : p));
        return [...prev, { ...item, quantity: qty }];
      }),
    remove: (id, variantId) => setItems((prev) => prev.filter((p) => !sameLine(p, id, variantId))),
    setQty: (id, qty, variantId) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((p) => !sameLine(p, id, variantId))
          : prev.map((p) => (sameLine(p, id, variantId) ? { ...p, quantity: qty } : p)),
      ),

    clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

// Product prices are stored in MMK.
export const formatMoney = (n: number) => {
  return `${new Intl.NumberFormat("en-US").format(Math.round(n))} MMK`;
};
