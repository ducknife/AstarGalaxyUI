import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userProfileMenu } from '../menu/HeaderList';
import { UserCircle2, Menu, X } from 'lucide-react';

export default function ResponsiveBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-2">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-[#1b1b1b]/50 backdrop-blur-[20px] border border-cyan-400/20 rounded-xl p-4 shadow-lg cursor-pointer transition-colors hover:bg-[#1b1b1b]/80"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <UserCircle2 size={20} />
          </div>
          <div>
            <div className="font-bold text-white text-[0.95rem]">User Account</div>
            <div className="text-[0.75rem] text-white/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa5]"></span> Active
            </div>
          </div>
        </div>
        <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 animate-[fadeInDown_0.2s_ease-out]">
          <nav className="flex flex-col gap-1 bg-[#1b1b1b]/95 backdrop-blur-[20px] border border-cyan-400/20 rounded-xl p-2 shadow-xl">
            {userProfileMenu.map(item => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.id} 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white/10 text-[#00e5ff]' 
                      : 'text-white/90 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={18} className={isActive ? 'text-[#00e5ff]' : 'group-hover:text-[#00e5ff]'} />
                      <span className="font-medium text-[0.9rem]">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
