import React from 'react';

export const WishlistContext = React.createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = React.useState([]);

  const toggle = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const value = { items, toggle };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return React.useContext(WishlistContext);
}
