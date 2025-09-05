import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import App from './App';
import { AppThemeProvider } from './theme';
import { CartProvider } from './state/CartContext';
import { WishlistProvider } from './state/WishlistContext';
import { UIProvider } from './state/UIContext';
import { AuthProvider } from './state/AuthContext';

// Start MSW in development to mock API endpoints
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { worker } = require('./mocks/browser');
  worker.start();
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <CssBaseline />
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
