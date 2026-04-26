import React, { useState } from 'react';
import { Camera, Save, Shield, Key } from 'lucide-react';

export default function AdminProfile() {
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=Admin+Prime&background=00e5ff&color=131314&bold=true');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl text-white mb-8">Admin Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col - Avatar & Security */}
        <div className="space-y-6">
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 flex flex-col items-center">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#00e5ff]/50">
                <img src={avatar} alt="Admin Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera size={24} className="text-white mb-1" />
                <span className="text-xs text-white font-medium">Upload</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <h2 className="text-xl text-white">Admin Prime</h2>
            <p className="text-[#00e5ff] text-sm font-medium mb-4 flex items-center gap-2">
              <Shield size={14} /> System Operator
            </p>
          </div>

          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-bold text-white border-b border-white/5 pb-3">Security</h3>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
              <Key size={16} /> Change Password
            </button>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
              <Shield size={16} /> Enable 2FA
            </button>
          </div>
        </div>

        {/* Right Col - Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl text-white mb-4 border-b border-white/5 pb-4">Personal Information</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                  <input type="text" defaultValue="Admin" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                  <input type="text" defaultValue="Prime" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input type="email" defaultValue="admin@astargalaxy.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 019-2834" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Bio / Notes</label>
                <textarea rows="4" defaultValue="Chief System Operator for AstarGalaxy trading platform." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none"></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button type="submit" className="px-8 py-3 bg-[linear-gradient(135deg,#00e5ff,#0097a7)] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                  <Save size={20} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
