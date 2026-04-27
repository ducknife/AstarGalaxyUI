import React from 'react';
import BrandCard from '../../components/ui/cards/BrandCard';
import Search from '../../components/ui/search/Search';

export default function Brands() {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Ambient glow along the horizon line */}
        <div className="absolute top-[25vh] left-0 w-full h-[120px] bg-[#00e5ff]/10 blur-[60px] -rotate-6 scale-110"></div>
      </div>

      <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
        <h1 className="text-3xl text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Galactic <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Brands & Suppliers</span></h1>
        <p className="text-white/90 mb-8" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Discover top-tier manufacturers across the universe.</p>

        {/* Search Bar */}
        <div className="mb-10 w-full flex justify-center lg:justify-start">
          <Search placeholder="Search brands, suppliers, or manufacturers..." />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <BrandCard key={i} index={i} brand={{ id: i, name: `Galactic Brand ${i}` }} />
          ))}
        </div>
      </div>
    </>
  );
}
