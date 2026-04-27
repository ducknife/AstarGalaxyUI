import React from 'react';
import { Ticket } from 'lucide-react';
import VoucherCard from '../../../components/ui/cards/VoucherCard';

export default function Vouchers() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Vouchers</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[1, 2, 3].map(i => (
          <VoucherCard 
            key={i} 
            index={i}
            voucher={{
              discount: `Free Shipping`,
              title: 'Loyalty Reward',
              minSpend: `Min. spend $${i * 50}`,
              actionText: 'Use Now'
            }}
          />
        ))}
      </div>
    </div>
  );
}
