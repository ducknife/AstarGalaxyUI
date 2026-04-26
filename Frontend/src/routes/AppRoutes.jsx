import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/Home';
import Products from '../pages/client/Products';
import ProductDetail from '../pages/client/ProductDetail';
import Brands from '../pages/client/Brands';
import Chatbot from '../components/ui/chatbot/Chatbot';
import VouchersHub from '../pages/client/VouchersHub';
import Cart from '../pages/client/Cart';
import Checkout from '../pages/client/Checkout';
import Payment from '../pages/client/Payment';
import Contact from '../pages/client/Contact';
import About from '../pages/client/About';
import Auth from '../pages/Auth';

import Profile from '../pages/client/user/Profile';
import Orders from '../pages/client/user/Orders';
import Wishlist from '../pages/client/user/Wishlist';
import Vouchers from '../pages/client/user/Vouchers';
import Reviews from '../pages/client/user/Reviews';
import Settings from '../pages/client/user/Settings';
import Notifications from '../pages/client/user/Notifications';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProfile from '../pages/admin/Profile';
import AdminProducts from '../pages/admin/Products';
import AdminAddEditProduct from '../pages/admin/AddEditProduct';
import AdminCategories from '../pages/admin/Categories';
import AdminOrders from '../pages/admin/Orders';
import AdminUsers from '../pages/admin/Users';
import AdminVouchers from '../pages/admin/Vouchers';
import AdminReviews from '../pages/admin/Reviews';
import AdminSettings from '../pages/admin/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Main Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Auth />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="chat" element={<Chatbot />} />
        <Route path="vouchers" element={<VouchersHub />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        
        {/* User Dashboard Routes (Wrapped in UserLayout) */}
        <Route path="user" element={<UserLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>

      {/* Admin Dashboard Routes (Wrapped in AdminLayout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AdminAddEditProduct />} />
        <Route path="products/edit/:id" element={<AdminAddEditProduct />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="vouchers" element={<AdminVouchers />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}