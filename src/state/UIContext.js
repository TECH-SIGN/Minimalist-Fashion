import React from 'react';

export const UIContext = React.createContext({
  miniCartOpen: false,
  setMiniCartOpen: () => {},
  authOpen: false,
  setAuthOpen: () => {},
});

export function UIProvider({ children }) {
  const [miniCartOpen, setMiniCartOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);

  const value = React.useMemo(() => ({ miniCartOpen, setMiniCartOpen, authOpen, setAuthOpen }), [miniCartOpen, authOpen]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  return React.useContext(UIContext);
}
