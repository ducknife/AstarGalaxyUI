import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SubmitButton from '../../../components/ui/buttons/SubmitButton';

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Settings</h2>
      <div className="flex flex-col gap-6 text-white/90">
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
        <div className="flex flex-col border-b border-white/5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white mb-1">Change Password</h3>
              <p className="text-[0.85rem]">Update your account password</p>
            </div>
            <button 
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
            >
              {showPasswordForm ? 'Cancel' : 'Update'}
            </button>
          </div>
          
          {/* Password Change Form */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showPasswordForm ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
            <div className="bg-[#1b1b1b] p-5 rounded-xl border border-white/10 space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Current Password</label>
                <div className="relative">
                  <input 
                    type={showOld ? "text" : "password"} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                    placeholder="Enter current password"
                  />
                  <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* New Password */}
              <div>
                <label className="block text-white/70 text-sm mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                    placeholder="Enter new password"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00e5ff] transition-colors"
                    placeholder="Confirm new password"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <SubmitButton>Save Changes</SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
