import React from 'react';
import VoucherCard from '../../components/ui/cards/VoucherCard';

export default function VouchersHub() {
  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <div className="bg-[linear-gradient(135deg,#00e5ff20,#00bfa520)] border border-[#00e5ff]/30 rounded-2xl p-8 mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Voucher <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Hub</span></h1>
        <p className="text-[#00e5ff]">Grab the best deals across the galaxy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <VoucherCard 
            key={i} 
            index={i}
            voucher={{
              discount: `${i * 10}% OFF`,
              title: 'Galactic Discount',
              minSpend: `Min. spend $${i * 100}`,
              actionText: 'Claim'
            }}
          />
        ))}
      </div>
    </div>
  );
}
