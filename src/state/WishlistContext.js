import React from 'react';

export const WishlistContext = React.createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = React.useState(() => {
    try {
      const raw = localStorage.getItem('wishlist:items');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try { localStorage.setItem('wishlist:items', JSON.stringify(items)); } catch {}
  }, [items]);

  const toggle = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const contains = React.useCallback((id) => items.some((p) => p.id === id), [items]);

  const value = { items, toggle, contains };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return React.useContext(WishlistContext);
}
