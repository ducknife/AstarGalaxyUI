import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticleGrid from './ParticleGrid';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

import Home from './pages/Home';
import Products from './pages/client/Products';
import ProductDetail from './pages/client/ProductDetail';
import Brands from './pages/client/Brands';
import Chatbot from './components/ui/chatbot/Chatbot';
import VouchersHub from './pages/client/VouchersHub';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import Payment from './pages/client/Payment';
import Contact from './pages/client/Contact';
import About from './pages/client/About';
import ScrollToTop from './components/ui/buttons/ScrollToTop';

import Profile from './pages/client/user/Profile';
import Orders from './pages/client/user/Orders';
import Wishlist from './pages/client/user/Wishlist';
import Vouchers from './pages/client/user/Vouchers';
import Reviews from './pages/client/user/Reviews';
import Settings from './pages/client/user/Settings';

function App() {
  return (
    <Router>
      <ParticleGrid />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Main Public Routes */}
          <Route index element={<Home />} />
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
          </Route>
        </Route>
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
