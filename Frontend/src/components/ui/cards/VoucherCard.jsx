import React from 'react';
import SubmitButton from '../buttons/SubmitButton';

export default function VoucherCard({ voucher, index }) {
  return (
    <div 
      className="bg-[#1b1b1b] rounded-2xl flex overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-[#00e5ff] w-28 flex flex-col items-center justify-center relative">
        {/* Jagged edge effect simulation */}
        <div className="absolute -left-1.5 top-0 bottom-0 w-3 flex flex-col justify-between py-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#1b1b1b]"></div>
          ))}
        </div>
        <span className="text-black font-black tracking-widest -rotate-90 whitespace-nowrap text-xl opacity-90">VOUCHER</span>
      </div>
      <div className="p-5 flex-1 relative flex flex-col justify-center">
        <h3 className="text-[#00e5ff] font-black text-2xl mb-1">{voucher.discount}</h3>
        <div className="text-white font-medium text-[0.95rem] mb-1">{voucher.title}</div>
        <p className="text-white/50 text-[0.8rem] mb-4">{voucher.minSpend}</p>
        <SubmitButton>
          {voucher.actionText || 'Claim'}
        </SubmitButton>
      </div>
    </div>
  );
}
