import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  const location = useLocation();
  const isChat = location.pathname === '/chat';

  return (
    <div className="main-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      {!isChat && <Footer />}
    </div>
  );
}