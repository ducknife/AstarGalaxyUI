import React from 'react';

export default function Profile() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Profile</h2>
      <div className="text-white/70">
        <p>Manage and protect your account</p>
        {/* Placeholder for User Info Form */}
        <div className="mt-8 grid grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label className="block text-[0.8rem] text-[#00e5ff] uppercase mb-2">Username</label>
            <div className="bg-black/20 border border-white/10 rounded-lg p-3 text-white">astargalaxy_user</div>
          </div>
          <div>
            <label className="block text-[0.8rem] text-[#00e5ff] uppercase mb-2">Email</label>
            <div className="bg-black/20 border border-white/10 rounded-lg p-3 text-white">user@astargalaxy.com</div>
          </div>
          <div className="col-span-2">
            <label className="block text-[0.8rem] text-[#00e5ff] uppercase mb-2">Delivery Address</label>
            <div className="bg-black/20 border border-white/10 rounded-lg p-3 text-white">Sector 4, Neo-Tokyo Station, Mars</div>
          </div>
        </div>
      </div>
    </div>
  );
}
