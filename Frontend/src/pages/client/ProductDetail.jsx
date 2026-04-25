import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Shield, ArrowLeft, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');

  // Mock product
  const product = {
    id: 1, 
    name: 'Phantom Drone V2', 
    category: 'Drone', 
    price: '$699', 
    rating: 4.8, 
    sold: 1204, 
    shortDes: 'Professional 8K drone with AI avoidance.', 
    desc: 'The Phantom Drone V2 is the ultimate tool for professional aerial cinematography. Equipped with an 8K HDR camera, it captures breathtaking details in any lighting condition. The advanced AI obstacle avoidance system ensures a safe flight path even in complex environments. With a 15km flight range and a 45-minute battery life, you have the freedom to explore and film like never before.', 
    specs: [['Camera', '8K HDR'], ['Range', '15km'], ['Battery', '45 min'], ['Weight', '895g'], ['Top Speed', '72 km/h']],
    reviews: [
      { id: 1, user: 'Commander Shepard', rating: 5, date: '2026-04-12', text: 'Incredible drone! The 8K camera is phenomenal and the AI avoidance saved me from crashing into a space station twice.' },
      { id: 2, user: 'Pilot Jax', rating: 4, date: '2026-04-05', text: 'Great battery life and range. Only giving 4 stars because the controller interface could be a bit more intuitive.' },
      { id: 3, user: 'AeroTech Fan', rating: 5, date: '2026-03-28', text: 'Best drone I have ever owned. Worth every galactic credit.' }
    ]
  };

  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-[#00e5ff] transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Top Section: Images and Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
             <Rocket size={120} className="text-white/20" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border cursor-pointer transition-colors ${i === 1 ? 'border-[#00e5ff] bg-[#00e5ff]/10' : 'border-white/10 bg-black/40 hover:border-white/30'}`}>
                <Rocket size={40} className="text-white/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="text-[#00e5ff] uppercase tracking-widest text-sm font-bold mb-2">{product.category}</div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-[#00e5ff] fill-[#00e5ff]" />
              <span className="text-white font-bold">{product.rating}</span>
              <span className="text-white/50 text-sm ml-1">({product.reviews.length} reviews)</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="text-white/70 text-sm">{product.sold.toLocaleString()} Sold</div>
          </div>

          <div className="text-5xl font-black bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] text-transparent bg-clip-text mb-6">
            {product.price}
          </div>

          <p className="text-white/80 text-lg leading-relaxed mb-8">
            {product.shortDes}
          </p>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center bg-[#1b1b1b] border border-white/10 rounded-xl overflow-hidden">
              <button className="w-12 h-12 flex items-center justify-center text-white/70 hover:bg-white/5 hover:text-white transition-colors">-</button>
              <div className="w-12 h-12 flex items-center justify-center text-white font-bold border-x border-white/10">1</div>
              <button className="w-12 h-12 flex items-center justify-center text-white/70 hover:bg-white/5 hover:text-white transition-colors">+</button>
            </div>
            <button className="flex-1 bg-white/10 border border-[#00e5ff]/50 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="w-12 h-12 bg-[#1b1b1b] border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-[#ff4d4f] hover:border-[#ff4d4f]/50 transition-all duration-300">
              <Heart size={20} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="bg-[#1b1b1b]/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <Shield size={18} className="text-[#00e5ff]" /> 100% Authentic Galactic Tech Guarantee
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <div className="w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#00e5ff] text-black text-[10px] font-bold">✓</div> Free Shipping across the Milky Way
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8">
        <button 
          onClick={() => setActiveTab('description')}
          className={`px-8 py-4 font-bold text-lg transition-colors relative ${activeTab === 'description' ? 'text-[#00e5ff]' : 'text-white/50 hover:text-white'}`}
        >
          Description
          {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00e5ff]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('specs')}
          className={`px-8 py-4 font-bold text-lg transition-colors relative ${activeTab === 'specs' ? 'text-[#00e5ff]' : 'text-white/50 hover:text-white'}`}
        >
          Specifications
          {activeTab === 'specs' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00e5ff]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`px-8 py-4 font-bold text-lg transition-colors relative ${activeTab === 'reviews' ? 'text-[#00e5ff]' : 'text-white/50 hover:text-white'}`}
        >
          Reviews ({product.reviews.length})
          {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00e5ff]"></div>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-[#1b1b1b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 min-h-[300px]">
        {activeTab === 'description' && (
          <div className="text-white/80 leading-relaxed max-w-4xl text-lg">
            {product.desc}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-3xl">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex border-b border-white/5 last:border-0">
                <div className="w-1/3 py-4 text-white/50">{spec[0]}</div>
                <div className="w-2/3 py-4 text-white font-medium">{spec[1]}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-4xl">
            <div className="flex items-center gap-8 mb-10 bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
              <div className="text-center">
                <div className="text-5xl font-black text-[#00e5ff] mb-2">{product.rating}</div>
                <div className="flex gap-1 justify-center mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < 5 ? "text-[#00e5ff] fill-[#00e5ff]" : "text-white/20"} />)}
                </div>
                <div className="text-white/50 text-sm">{product.reviews.length} Ratings</div>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3 mb-1">
                    <div className="flex items-center gap-1 w-12 text-sm text-white/70">{stars} <Star size={12} className="fill-current" /></div>
                    <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-[#00e5ff]" style={{ width: stars === 5 ? '80%' : stars === 4 ? '20%' : '0%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] flex items-center justify-center text-black font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{review.user}</div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < review.rating ? "text-[#00e5ff] fill-[#00e5ff]" : "text-white/20"} />)}
                      </div>
                    </div>
                    <div className="ml-auto text-white/40 text-sm">{review.date}</div>
                  </div>
                  <p className="text-white/80">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
