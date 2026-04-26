import React from 'react';
import { Building2 } from 'lucide-react';

export default function BrandCard({ brand, index }) {
  return (
    <div 
      className="bg-[#131314] border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-aurora-cyan  cursor-pointer group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="w-16 h-16 rounded-full bg-black/40 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Building2 size={24} className="text-white/90 group-hover:text-aurora-cyan transition-colors" />
      </div>
      <span className="text-white font-medium text-[0.9rem] text-center px-2">{brand.name}</span>
    </div>
  );
}
