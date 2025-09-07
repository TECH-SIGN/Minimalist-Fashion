import React from 'react';

// Lazy-loaded user/auth/cart/profile routes
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const SignUpPage = React.lazy(() => import('../pages/SignUpPage'));
const ProfilePage = React.lazy(() => import('../pages/ProfilePage'));
const WishlistPage = React.lazy(() => import('../pages/WishlistPage'));
const CartPage = React.lazy(() => import('../pages/CartPage'));
const CheckoutPage = React.lazy(() => import('../pages/CheckoutPage'));
const OrdersPage = React.lazy(() => import('../pages/OrdersPage'));

// Fallbacks
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

const userRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/profile/*', element: <ProfilePage /> },
  { path: '/wishlist', element: <WishlistPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/orders', element: <OrdersPage /> },
  // Global catch-all (for non-admin unmatched routes)
  { path: '*', element: <NotFoundPage /> },
];

export default userRoutes;
