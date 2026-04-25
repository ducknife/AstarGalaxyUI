import React from 'react';

export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Settings</h2>
      <div className="flex flex-col gap-6 text-white/70">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="font-bold text-white mb-1">Email Notifications</h3>
            <p className="text-[0.85rem]">Receive order updates and promotions</p>
          </div>
          <div className="w-12 h-6 bg-[#00e5ff] rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="font-bold text-white mb-1">Two-Factor Authentication</h3>
            <p className="text-[0.85rem]">Secure your account</p>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors">Enable</button>
        </div>
      </div>
    </div>
  );
}
