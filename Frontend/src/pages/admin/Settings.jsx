import React, { useState } from 'react';
import { Save, Image as ImageIcon, Truck, Mail, ShieldAlert, Check } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [storeStatus, setStoreStatus] = useState('online');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl text-white mb-8">System Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 space-y-2">
          <button onClick={() => setActiveTab('general')} className={`w-full text-left px-4 py-3 font-bold transition-colors ${activeTab === 'general' ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-l-2 border-[#00e5ff] rounded-r-xl' : 'text-white/50 hover:text-white hover:bg-white/5 rounded-xl'}`}>General Appearance</button>
          <button onClick={() => setActiveTab('shipping')} className={`w-full text-left px-4 py-3 font-bold transition-colors ${activeTab === 'shipping' ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-l-2 border-[#00e5ff] rounded-r-xl' : 'text-white/50 hover:text-white hover:bg-white/5 rounded-xl'}`}>Shipping & Operations</button>
          <button onClick={() => setActiveTab('email')} className={`w-full text-left px-4 py-3 font-bold transition-colors ${activeTab === 'email' ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-l-2 border-[#00e5ff] rounded-r-xl' : 'text-white/50 hover:text-white hover:bg-white/5 rounded-xl'}`}>Email & Notifications</button>
          <button onClick={() => setActiveTab('security')} className={`w-full text-left px-4 py-3 font-bold transition-colors ${activeTab === 'security' ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-l-2 border-[#00e5ff] rounded-r-xl' : 'text-white/50 hover:text-white hover:bg-white/5 rounded-xl'}`}>Security & Access</button>
        </div>

        <div className="md:col-span-2 space-y-6">
          
          {activeTab === 'general' && (
            <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <ImageIcon className="text-[#00e5ff]" />
                <h2 className="text-xl text-white">Hero Banner Configuration</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Main Headline</label>
                <input type="text" defaultValue="DISCOVER THE UNIVERSE" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Sub-headline</label>
                <input type="text" defaultValue="Your journey to the stars begins with the finest spacecraft ever engineered." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Background Video URL</label>
                <input type="text" defaultValue="/assets/hero-bg.mp4" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <Truck className="text-[#00e5ff]" />
                <h2 className="text-xl text-white">Store Operations & Shipping</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Default Base Shipping ($)</label>
                  <input type="number" defaultValue="5000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Free Shipping Threshold ($)</label>
                  <input type="number" defaultValue="100000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Store Status</label>
                <CustomDropdown 
                  label="Store Status"
                  options={[
                    {label: 'Online & Accepting Orders', value: 'online'},
                    {label: 'Maintenance Mode (Visitors see coming soon)', value: 'maintenance'}
                  ]}
                  selectedValue={storeStatus}
                  onSelect={setStoreStatus}
                />
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <Mail className="text-[#00e5ff]" />
                <h2 className="text-xl text-white">Email & Notifications</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Support Email Address</label>
                <input type="email" defaultValue="support@astargalaxy.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="peer hidden" />
                  <div className="w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center transition-all duration-200 shrink-0 peer-checked:bg-[#00e5ff] peer-checked:border-[#00e5ff]">
                    <Check size={14} strokeWidth={4} className="text-black scale-0 transition-transform duration-200 peer-checked:scale-100" />
                  </div>
                  <span className="text-white font-medium">Send Order Confirmation Emails</span>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="peer hidden" />
                  <div className="w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center transition-all duration-200 shrink-0 peer-checked:bg-[#00e5ff] peer-checked:border-[#00e5ff]">
                    <Check size={14} strokeWidth={4} className="text-black scale-0 transition-transform duration-200 peer-checked:scale-100" />
                  </div>
                  <span className="text-white font-medium">Notify Admins on New Review</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <ShieldAlert className="text-[#00e5ff]" />
                <h2 className="text-xl text-white">Security & Access</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Admin Session Timeout (Minutes)</label>
                <input type="number" defaultValue="60" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h3 className="text-red-400 font-bold mb-2">Danger Zone</h3>
                <p className="text-white/60 text-sm mb-4">Actions here can cause data loss or system disruption.</p>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 font-bold rounded-lg border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors">
                  Clear System Cache
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button className="px-8 py-4 bg-[linear-gradient(135deg,#00e5ff,#0097a7)] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
              <Save size={20} /> Save Configuration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
