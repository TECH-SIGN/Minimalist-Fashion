import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLayout from './components/admin/AdminLayout';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';
import OrdersAdminPage from './pages/admin/OrdersAdminPage';
import UsersAdminPage from './pages/admin/UsersAdminPage';
import SettingsAdminPage from './pages/admin/SettingsAdminPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Layout>
      <Box component="main" sx={{ py: 2 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<ProductsAdminPage />} />
              <Route path="orders" element={<OrdersAdminPage />} />
              <Route path="users" element={<UsersAdminPage />} />
              <Route path="settings" element={<SettingsAdminPage />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </Layout>
  );
}

export default App;
