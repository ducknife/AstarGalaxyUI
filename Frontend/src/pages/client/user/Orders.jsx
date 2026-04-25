import React from 'react';
import { Package } from 'lucide-react';

export default function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Purchase History</h2>
      
      {/* Order Tabs */}
      <div className="flex gap-6 mb-8 border-b border-white/5 pb-2">
        <button className="text-[#00e5ff] font-medium border-b-2 border-[#00e5ff] pb-2">All</button>
        <button className="text-white/50 hover:text-white transition-colors pb-2">To Pay</button>
        <button className="text-white/50 hover:text-white transition-colors pb-2">To Ship</button>
        <button className="text-white/50 hover:text-white transition-colors pb-2">Completed</button>
        <button className="text-white/50 hover:text-white transition-colors pb-2">Cancelled</button>
      </div>

      <div className="flex flex-col gap-4 text-center py-20 text-white/40 items-center">
        <Package size={48} className="text-white/20" />
        <p>No orders yet</p>
      </div>
    </div>
  );
}
