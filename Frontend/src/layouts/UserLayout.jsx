import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientBar from '../components/ui/bars/ClientBar';

export default function UserLayout() {
  return (
    <div className="pt-[100px] pb-12 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <div className="flex gap-8">
        <ClientBar />
        <div className="flex-1 bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-8 min-h-[600px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
