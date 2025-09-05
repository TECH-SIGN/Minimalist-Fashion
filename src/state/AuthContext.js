import React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    try {
      const raw = localStorage.getItem('auth:user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = async ({ email, name }) => {
    const u = { id: 'u1', email, name: name || email.split('@')[0] };
    setUser(u);
    try { localStorage.setItem('auth:user', JSON.stringify(u)); } catch {}
    return u;
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('auth:user'); } catch {}
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
