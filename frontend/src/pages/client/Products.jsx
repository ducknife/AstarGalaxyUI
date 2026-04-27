import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';
import ProductCard from '../../components/ui/cards/ProductCard';
import Search from '../../components/ui/search/Search';

const mockProducts = [
  { id: 1, name: 'Astar Fighter Mk 1', category: 'Spacecraft', price: '$1500', rating: 4.8, sold: 123, shortDes: 'Advanced interstellar spacecraft with warp capabilities and AI navigation.' },
  { id: 2, name: 'Astar Fighter Mk 2', category: 'Spacecraft', price: '$3000', rating: 4.9, sold: 456, shortDes: 'Upgraded fighter with enhanced shields and dual plasma cannons.' },
  { id: 3, name: 'Astar Fighter Mk 3', category: 'Spacecraft', price: '$4500', rating: 4.7, sold: 789, shortDes: 'Heavy duty spacecraft for deep space exploration and combat.' },
  { id: 4, name: 'Astar Fighter Mk 4', category: 'Spacecraft', price: '$6000', rating: 4.6, sold: 101, shortDes: 'Stealth bomber designed for covert operations behind enemy lines.' },
  { id: 5, name: 'Astar Fighter Mk 5', category: 'Spacecraft', price: '$7500', rating: 5.0, sold: 234, shortDes: 'Luxury cruiser with state-of-the-art living quarters.' },
  { id: 6, name: 'Astar Fighter Mk 6', category: 'Spacecraft', price: '$9000', rating: 4.5, sold: 567, shortDes: 'Cargo hauler capable of transporting massive payloads across the galaxy.' },
];

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [sortOption, setSortOption] = useState('featured');

  const sortOptions = [
    { label: 'Sort by: Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
  ];

  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <h1 className="text-3xl text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
        {category ? (
          <>
            Category: <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </>
        ) : (
          <>
            All <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Products</span>
          </>
        )}
      </h1>
      <p className="text-white/90 mb-8" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Browse our advanced catalog from across the galaxy.</p>
      
      {/* Search, Filters & Sorting */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 relative z-30 w-full items-center">
        <div className="flex-1 w-full">
          <Search placeholder="Search for spacecraft, robots, or components..." />
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:w-[220px]">
            <CustomDropdown 
              label="Sort Options"
              options={sortOptions}
              selectedValue={sortOption}
              onSelect={setSortOption}
            />
          </div>
          <button className="bg-[#1b1b1b] hover:bg-[#00e5ff] text-white hover:text-black rounded-full px-8 py-3 border border-white/10 hover:border-[#00e5ff] transition-all font-medium cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] shrink-0">
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((p, i) => (
          <div key={p.id} style={{ animationDelay: `${i * 0.1}s` }} className="animate-[fadeInUp_0.6s_ease-out_backwards] h-full">
            <ProductCard product={p} onSelect={(product) => navigate(`/product/${product.id}`)} />
          </div>
        ))}
      </div>
    </div>
  );
}
