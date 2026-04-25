import React from 'react';
import { Building2 } from 'lucide-react';

export default function BrandCard({ brand, index }) {
  return (
    <div 
      className="bg-[#1b1b1b] rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#00e5ff]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] cursor-pointer group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="w-16 h-16 rounded-full bg-black/40 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Building2 size={24} className="text-white/40 group-hover:text-[#00e5ff] transition-colors" />
      </div>
      <span className="text-white font-medium text-[0.9rem] text-center px-2">{brand.name}</span>
    </div>
  );
}
