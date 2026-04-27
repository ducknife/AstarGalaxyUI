import React, { useState } from 'react';
import { Ticket, Search, Plus, Trash2, Calendar, Percent, DollarSign, Check } from 'lucide-react';

const mockVouchers = [
  { id: 1, code: 'ASTAR-NEW', type: 'percentage', value: 10, minAmount: 10000, maxUsage: 500, used: 124, expires: '2026-12-31' },
  { id: 2, code: 'GALAXY-5K', type: 'fixed', value: 5000, minAmount: 50000, maxUsage: 100, used: 100, expires: '2026-05-01' },
];

export default function Vouchers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [vType, setVType] = useState('percentage');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-white">Vouchers Management</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#00e5ff] text-black rounded-xl font-bold hover:bg-[#00bfa5] transition-colors flex items-center gap-2"
        >
          {showAddForm ? <Trash2 size={18} /> : <Plus size={18} />} 
          {showAddForm ? 'Cancel' : 'Create Voucher'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-[#131314] p-6 rounded-2xl border border-[#00e5ff]/30 mb-8">
          <h2 className="text-xl text-white mb-6">Create New Voucher</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Voucher Code</label>
                <div className="relative">
                  <Ticket size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="text" placeholder="e.g. SUMMER-SALE" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white uppercase focus:outline-none focus:border-[#00e5ff]/50 transition-colors font-bold tracking-widest" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Discount Type</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-xl cursor-pointer border transition-colors ${vType === 'percentage' ? 'bg-[#00e5ff]/5 border-[#00e5ff] text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                    <input type="radio" name="vtype" className="hidden" checked={vType === 'percentage'} onChange={() => setVType('percentage')} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                      vType === 'percentage' ? 'bg-[#00e5ff] border-[#00e5ff]' : 'border-white/40'
                    }`}>
                      <Check size={12} strokeWidth={4} className={`text-black transition-transform duration-200 ${
                        vType === 'percentage' ? 'scale-100' : 'scale-0'
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent size={16} className={vType === 'percentage' ? 'text-[#00e5ff]' : 'text-white/50'} />
                      <span className="font-medium">Percentage</span>
                    </div>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-xl cursor-pointer border transition-colors ${vType === 'fixed' ? 'bg-[#00e5ff]/5 border-[#00e5ff] text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                    <input type="radio" name="vtype" className="hidden" checked={vType === 'fixed'} onChange={() => setVType('fixed')} />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                      vType === 'fixed' ? 'bg-[#00e5ff] border-[#00e5ff]' : 'border-white/40'
                    }`}>
                      <Check size={12} strokeWidth={4} className={`text-black transition-transform duration-200 ${
                        vType === 'fixed' ? 'scale-100' : 'scale-0'
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className={vType === 'fixed' ? 'text-[#00e5ff]' : 'text-white/50'} />
                      <span className="font-medium">Fixed Amount</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Discount Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">{vType === 'percentage' ? '%' : '$'}</span>
                  <input type="number" placeholder={vType === 'percentage' ? "10" : "5000"} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Min Amount ($)</label>
                <input type="number" placeholder="10000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Usage Limit</label>
                <input type="number" placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Expiry Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors color-scheme-dark" style={{colorScheme: 'dark'}} />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button type="submit" className="px-8 py-3 bg-[linear-gradient(135deg,#00e5ff,#0097a7)] text-black font-bold rounded-xl transition-all hover:-translate-y-1">
                Generate Voucher
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-[#131314] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Code</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Discount</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Min Order</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Usage</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Expires</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockVouchers.map((voucher) => {
                const isFullyUsed = voucher.used >= voucher.maxUsage;
                return (
                  <tr key={voucher.id} className={`hover:bg-white/[0.02] transition-colors group ${isFullyUsed ? 'opacity-50' : ''}`}>
                    <td className="p-4">
                      <span className="font-bold text-[#00e5ff] tracking-wider bg-[#00e5ff]/10 px-3 py-1 rounded border border-[#00e5ff]/20">
                        {voucher.code}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white">
                      {voucher.type === 'percentage' ? `${voucher.value}% OFF` : `$${voucher.value.toLocaleString()} OFF`}
                    </td>
                    <td className="p-4 text-white/70">${voucher.minAmount.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-24">
                          <div className={`h-full ${isFullyUsed ? 'bg-red-500' : 'bg-[#00e5ff]'}`} style={{width: `${(voucher.used / voucher.maxUsage) * 100}%`}}></div>
                        </div>
                        <span className="text-xs font-medium text-white/50">{voucher.used}/{voucher.maxUsage}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/70">{voucher.expires}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 bg-white/5 hover:bg-red-500/10 text-white hover:text-red-500 rounded-lg transition-colors opacity-50 group-hover:opacity-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
