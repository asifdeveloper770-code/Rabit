import { useEffect, useState, useCallback } from "react";

export type CartItem = { id: string; qty: number };

const KEY = "jr_cart_v1";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("jr:cart", { detail: items }));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const sync = () => setItems(read());
    window.addEventListener("jr:cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("jr:cart", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    const current = read();
    const found = current.find((i) => i.id === id);
    const next = found
      ? current.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      : [...current, { id, qty }];
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      write(read().filter((i) => i.id !== id));
    } else {
      write(read().map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  }, []);

  const clear = useCallback(() => write([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, setQty, clear, count };
}
