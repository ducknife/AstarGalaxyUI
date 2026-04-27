import React from 'react';
import VoucherCard from '../../components/ui/cards/VoucherCard';

export default function VouchersHub() {
  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <div className="bg-[#021818]/60 backdrop-blur-[20px] border border-[#003d3d] rounded-[2rem] py-12 px-8 mb-12 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium text-white mb-3">Voucher <span className="text-[#b3ffff]">Hub</span></h1>
        <p className="text-white/80 text-[0.9rem] font-medium">Grab the best deals across the galaxy</p>
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
