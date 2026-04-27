import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientBar from '../components/ui/bars/ClientBar';
import ResponsiveBar from '../components/ui/bars/ResponsiveBar';

export default function UserLayout() {
  return (
    <div className="pt-[100px] pb-12 min-h-screen relative z-10 max-w-[1320px] mx-auto px-4 lg:px-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Mobile Hamburger Menu */}
        <ResponsiveBar />
        
        {/* Desktop Sidebar Menu */}
        <div className="hidden lg:block">
          <ClientBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#1b1b1b]/50 backdrop-blur-[20px] border border-cyan-400/20 rounded-2xl p-6 lg:p-8 min-h-[600px] overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
