import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rocket, User, ShoppingCart, LayoutDashboard, Settings, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { clientMenu, adminMenu, userProfileMenu } from '../ui/menu/HeaderList';
import CustomDropdown from '../ui/dropdown/CustomDropdown';
import FowardButton from '../ui/buttons/FowardButton';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // TODO: Replace with actual auth context later
  const isAdmin = false; 
  const activeMenu = isAdmin ? adminMenu : clientMenu;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] z-[100] bg-black/40 backdrop-blur-md transition-colors duration-300" id="header">
      <div className="flex items-center justify-between h-full max-w-[1320px] mx-auto px-6">
        <Link className="flex items-center gap-2.5 no-underline cursor-pointer" to="/" id="logo">
          <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,229,255,0.15)] animate-[spin_12s_linear_infinite]">
            <Rocket size={20} />
          </div>
          <span className="text-[1.3rem] text-white tracking-[-0.02em]">AstarGalaxy</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" id="nav-menu">
          {activeMenu.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const baseClass = "relative text-[0.9rem] font-medium cursor-pointer transition-colors duration-200 py-2 group after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] after:transition-all after:duration-300 after:rounded-sm";
            const colorClass = isActive ? "text-white after:w-full" : "text-white hover:text-white after:w-0 hover:after:w-full";

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
          <div className="relative group/profile hidden lg:block">
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
                    <Link key={item.id} className="flex items-center gap-2 px-2.5 py-2 text-white/90 text-[0.85rem] rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white/10 hover:text-[#00e5ff]" to={item.path}>
                      <Icon size={16} /> {item.label}
                    </Link>
                  );
                })
              ) : (
                <Link className="flex items-center gap-2 px-2.5 py-2 text-white/90 text-[0.85rem] rounded-lg transition-colors duration-200 cursor-pointer hover:bg-white/10 hover:text-[#00e5ff]" to="/admin">
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
            <Link to="/cart" className="relative w-[42px] h-[42px] flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/90 cursor-pointer transition-all duration-200 hover:bg-white/15 hover:text-white hover:border-white/30" id="cart-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] rounded-full text-[0.65rem] font-bold flex items-center justify-center text-white animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]">3</span>
            </Link>
          )}
          <FowardButton onClick={() => navigate('/contact')} className="!shadow-none hover:!shadow-none hidden lg:block text-[0.85rem] px-5">
            Contact
          </FowardButton>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`absolute top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#111111]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            {activeMenu.map(item => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              const colorClass = isActive ? "text-[#00e5ff] font-bold" : "text-white/90 font-medium";

              if (item.dropdown) {
                return (
                  <div key={item.id} className="flex flex-col gap-4 border-b border-white/10 pb-6">
                    <span className="text-white/90 text-sm uppercase tracking-wider">{item.label}</span>
                    <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                      {item.dropdownItems.map(sub => (
                        <Link 
                          key={sub.id} 
                          to={sub.path}
                          className={`text-lg ${location.pathname === sub.path ? "text-[#00e5ff]" : "text-white/90"}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link 
                  key={item.id} 
                  to={item.path} 
                  className={`text-xl border-b border-white/10 pb-6 ${colorClass}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link 
              to="/contact" 
              className="text-xl border-b border-white/10 pb-6 text-white/90 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Command
            </Link>

            {/* ClientBar / User Account Menu for Mobile */}
            <div className="mt-2 pt-4">
              <span className="text-[#00e5ff] text-sm uppercase tracking-wider font-bold mb-6 block">User Account</span>
              <div className="flex flex-col gap-6">
                {!isAdmin ? (
                  userProfileMenu.map(item => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link 
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 text-xl ${isActive ? 'text-[#00e5ff] font-bold' : 'text-white/90 font-medium'}`}
                      >
                        <Icon size={24} className={isActive ? 'text-[#00e5ff]' : 'text-white/70'} />
                        {item.label}
                      </Link>
                    );
                  })
                ) : (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xl text-[#00e5ff] font-bold"
                  >
                    <LayoutDashboard size={24} />
                    Admin Dashboard
                  </Link>
                )}
                
                <button className="flex items-center gap-3 text-xl text-[#ff4d4f] font-medium mt-2">
                  <LogOut size={24} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
