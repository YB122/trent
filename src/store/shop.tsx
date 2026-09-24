"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartMap = Record<string, number>;

type Persisted = {
  wishlist: string[];
  cart: CartMap;
};

const STORAGE_KEY = "trent-shop-v1";

function load(): Persisted {
  if (typeof window === "undefined") return { wishlist: [], cart: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { wishlist: [], cart: {} };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      wishlist: Array.isArray(parsed.wishlist)
        ? parsed.wishlist.filter((x) => typeof x === "string")
        : [],
      cart:
        parsed.cart && typeof parsed.cart === "object" ? parsed.cart : {},
    };
  } catch {
    return { wishlist: [], cart: {} };
  }
}

type ShopContextValue = {
  wishlist: string[];
  cart: CartMap;
  wishCount: number;
  cartCount: number;
  isWished: (id: string) => boolean;
  toggleWish: (id: string) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => load().wishlist);
  const [cart, setCart] = useState<CartMap>(() => load().cart);

  // Persist every change to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ wishlist, cart }));
    } catch {
      // storage full / private mode — ignore
    }
  }, [wishlist, cart]);

  // Keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue) as Persisted;
        setWishlist(Array.isArray(parsed.wishlist) ? parsed.wishlist : []);
        setCart(
          parsed.cart && typeof parsed.cart === "object" ? parsed.cart : {}
        );
      } catch {
        // ignore malformed values
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
    );
  }, []);

  const isWished = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + qty }));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      if (qty <= 0) {
        const { [id]: _removed, ...rest } = c;
        return rest;
      }
      return { ...c, [id]: qty };
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => {
      const { [id]: _removed, ...rest } = c;
      return rest;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
    return {
      wishlist,
      cart,
      wishCount: wishlist.length,
      cartCount,
      isWished,
      toggleWish,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
    };
  }, [wishlist, cart, isWished, toggleWish, addToCart, setQty, removeFromCart, clearCart]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
