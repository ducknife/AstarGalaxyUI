import React from 'react';
import BrandCard from '../../components/ui/cards/BrandCard';

export default function Brands() {
  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-white mb-2">Galactic <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Brands & Suppliers</span></h1>
      <p className="text-white/60 mb-8">Discover top-tier manufacturers across the universe.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
          <BrandCard key={i} index={i} brand={{ id: i, name: `Galactic Brand ${i}` }} />
        ))}
      </div>
    </div>
  );
}
