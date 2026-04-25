import { User, Package, Heart, Ticket, Star, Settings } from 'lucide-react';

export const clientMenu = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    dropdown: false,
  },
  {
    id: 'about',
    label: 'About Us',
    path: '/about',
    dropdown: false,
  },
  {
    id: 'products',
    label: 'All Products',
    path: '/products',
    dropdown: true,
    dropdownItems: [
      { id: 'spaceships', label: 'Spaceships', path: '/products?category=spaceships' },
      { id: 'robots', label: 'Robots & Droids', path: '/products?category=robots' },
      { id: 'components', label: 'Components', path: '/products?category=components' },
    ]
  },
  {
    id: 'brands',
    label: 'Brands',
    path: '/brands',
    dropdown: false,
  },
  {
    id: 'vouchers',
    label: 'Vouchers Hub',
    path: '/vouchers',
    dropdown: false,
  },
  {
    id: 'astar-ai',
    label: 'Astar AI',
    path: '/chat',
    dropdown: false,
  }
];

export const userProfileMenu = [
  { id: 'my-profile', label: 'My Profile', path: '/user/profile', icon: User },
  { id: 'my-orders', label: 'Purchase History', path: '/user/orders', icon: Package },
  { id: 'my-wishlist', label: 'My Wishlist', path: '/user/wishlist', icon: Heart },
  { id: 'my-vouchers', label: 'My Vouchers', path: '/user/vouchers', icon: Ticket },
  { id: 'my-reviews', label: 'My Reviews', path: '/user/reviews', icon: Star },
  { id: 'settings', label: 'Settings', path: '/user/settings', icon: Settings },
];

export const adminMenu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin',
    dropdown: false,
  },
  {
    id: 'products-mgmt',
    label: 'Products',
    path: '/admin/products',
    dropdown: true,
    dropdownItems: [
      { id: 'all-products', label: 'All Products', path: '/admin/products' },
      { id: 'categories', label: 'Categories', path: '/admin/categories' },
    ]
  },
  {
    id: 'orders-mgmt',
    label: 'Orders',
    path: '/admin/orders',
    dropdown: false,
  },
  {
    id: 'users-mgmt',
    label: 'Users',
    path: '/admin/users',
    dropdown: false,
  },
  {
    id: 'vouchers-mgmt',
    label: 'Vouchers',
    path: '/admin/vouchers',
    dropdown: false,
  },
];
