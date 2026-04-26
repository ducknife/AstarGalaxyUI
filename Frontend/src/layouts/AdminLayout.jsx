import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Ticket, 
  Star, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/vouchers', icon: Ticket, label: 'Vouchers' },
    { path: '/admin/reviews', icon: Star, label: 'Reviews' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 h-full bg-[#131314] border-r border-white/5 transition-all duration-300 ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <Link to="/admin" className={`font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#00bfa5] ${!isSidebarOpen && 'md:hidden'}`}>
            ASTAR<span className="text-white">ADMIN</span>
          </Link>
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition-colors ${isActive ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/20' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon size={20} className={isActive ? 'text-[#00e5ff]' : ''} />
                <span className={`font-medium ${!isSidebarOpen && 'md:hidden'}`}>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-8 mt-8 border-t border-white/5">
            <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut size={20} />
              <span className={`font-medium ${!isSidebarOpen && 'md:hidden'}`}>Exit to Store</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-[#131314]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-[#00e5ff]/50 transition-colors">
              <Search size={16} className="text-white/40 mr-2" />
              <input type="text" placeholder="Search Command Center..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/30" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-white/60 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/admin/profile" className="flex items-center gap-3 pl-4 border-l border-white/10 hover:bg-white/5 p-1 rounded-xl transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#00bfa5] flex items-center justify-center font-bold text-black text-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold leading-tight">Admin Prime</p>
                <p className="text-xs text-[#00e5ff] leading-tight">System Operator</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar relative">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
