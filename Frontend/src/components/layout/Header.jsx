import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rocket, User, ShoppingCart, LayoutDashboard, Settings, LogOut, ChevronDown } from 'lucide-react';
import { clientMenu, adminMenu, userProfileMenu } from '../ui/menu/HeaderList';
import CustomDropdown from '../ui/dropdown/CustomDropdown';
import FowardButton from '../ui/buttons/FowardButton';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  // TODO: Replace with actual auth context later
  const isAdmin = false; 
  const activeMenu = isAdmin ? adminMenu : clientMenu;

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] z-[100] bg-black/40 backdrop-blur-md transition-colors duration-300" id="header">
      <div className="flex items-center justify-between h-full max-w-[1320px] mx-auto px-6">
        <Link className="flex items-center gap-2.5 no-underline cursor-pointer" to="/" id="logo">
          <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,229,255,0.15)] animate-[spin_12s_linear_infinite]">
            <Rocket size={20} />
          </div>
          <span className="text-[1.3rem] font-bold text-white tracking-[-0.02em]">AstarGalaxy</span>
        </Link>

        <nav className="flex items-center gap-8" id="nav-menu">
          {activeMenu.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const baseClass = "relative text-[0.9rem] font-medium cursor-pointer transition-colors duration-200 py-2 group after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] after:transition-all after:duration-300 after:rounded-sm";
            const colorClass = isActive ? "text-white after:w-full" : "text-white/75 hover:text-white after:w-0 hover:after:w-full";

            if (item.dropdown) {
              return (
                <div key={item.id} className="relative z-[100] group">
                  <CustomDropdown 
                    label={item.label}
                    options={item.dropdownItems.map(sub => ({ label: sub.label, value: sub.path }))}
                    onSelect={(val) => navigate(val)}
                    variant="nav"
                  />
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] rounded-sm transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                </div>
              );
            }
            return (
              <Link key={item.id} className={`${baseClass} ${colorClass}`} to={item.path}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <div className="relative group/profile">
            <button className="relative w-[42px] h-[42px] flex items-center justify-center rounded-full bg-black/40 border-2 border-[#00e5ff] cursor-pointer transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] overflow-hidden" id="profile-btn" aria-label="Profile">
              <img src="https://i.pravatar.cc/150?img=33" alt="User Avatar" className="w-full h-full object-cover" />
            </button>
            <div className="absolute top-[calc(100%+12px)] right-0 min-w-[220px] bg-[#1b1b1b]/95 backdrop-blur-[20px] border border-[#00e5ff]/10 rounded-xl p-3 opacity-0 invisible transition-all duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group-hover/profile:opacity-100 group-hover/profile:visible">
              <div className="text-[0.75rem] text-[#00e5ff] px-2.5 mb-2 border-b border-[#00e5ff]/10 pb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
                Role: <strong className="text-white">{isAdmin ? 'Admin' : 'Customer'}</strong>
              </div>
              
              {!isAdmin ? (
                userProfileMenu.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.id} className="flex items-center gap-2 px-2.5 py-2 text-white/80 text-[0.85rem] rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white/10 hover:text-[#00e5ff]" to={item.path}>
                      <Icon size={16} /> {item.label}
                    </Link>
                  );
                })
              ) : (
                <Link className="flex items-center gap-2 px-2.5 py-2 text-white/80 text-[0.85rem] rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white/10 hover:text-[#00e5ff]" to="/admin">
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
              )}
              
              <div className="h-px bg-white/10 my-2"></div>
              <button className="w-full text-left flex items-center gap-2 px-2.5 py-2 text-[#ff4d4f]/80 text-[0.85rem] rounded-lg transition-colors duration-200 cursor-pointer hover:bg-[#ff4d4f]/10 hover:text-[#ff4d4f]">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
          {!isAdmin && (
            <Link to="/cart" className="relative w-[42px] h-[42px] flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 cursor-pointer transition-all duration-200 hover:bg-white/15 hover:text-white hover:border-white/30" id="cart-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] rounded-full text-[0.65rem] font-bold flex items-center justify-center text-white animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]">3</span>
            </Link>
          )}
          <FowardButton onClick={() => navigate('/contact')} className="!shadow-none hover:!shadow-none hidden sm:block text-[0.85rem] px-5">
            Contact
          </FowardButton>
        </div>
      </div>
    </header>
  );
}
