import React from 'react';
import { NavLink } from 'react-router-dom';
import { userProfileMenu } from '../menu/HeaderList';
import { UserCircle2 } from 'lucide-react';

export default function ClientBar() {
  return (
    <div className="w-[250px] shrink-0">
      <div className="flex items-center gap-3 mb-6 p-4 border-b border-white/10">
        <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,229,255,0.3)]">
          <UserCircle2 size={24} />
        </div>
        <div>
          <div className="font-bold text-white text-[1.05rem]">User Account</div>
          <div className="text-[0.8rem] text-white/50 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00bfa5]"></span> Active
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {userProfileMenu.map(item => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.id} 
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#1b1b1b] text-white' 
                  : 'text-white/70 hover:bg-[#1b1b1b] hover:text-white'
              }`}
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-[#00e5ff]' : 'group-hover:text-[#00e5ff]'} />
                  <span className="font-medium text-[0.95rem]">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
