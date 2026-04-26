import React from 'react';
import { Star, Quote } from 'lucide-react';

const feedbacks = [
  {
    id: 1,
    name: "Commander Shepard",
    role: "N7 Special Operative",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    text: "The Astar Fighter Mk 4 exceeded all stealth requirements. Its plasma thrusters are incredibly silent. Best purchase for deep space recon."
  },
  {
    id: 2,
    name: "Dr. Liara T'Soni",
    role: "Information Broker",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "I sourced 50 Quantum Cores for my shadow network through AstarGalaxy. The encrypted transaction was flawless. Highly recommended."
  },
  {
    id: 3,
    name: "Garrus Vakarian",
    role: "Tactical Officer",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 4,
    text: "Calibrating the new heavy turrets I bought from here was a breeze. They pack a serious punch. Only docking one star because shipping took 2 extra parsecs."
  }
];

export default function BestFeedBacks() {
  return (
    <section className="py-[120px] relative z-[1]">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 animate-[fadeInUp_0.8s_ease-out]">
          <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            Commander <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Testimonials</span>
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
            Don't just take our word for it. Hear from elite operatives and captains who rely on our hardware across the Milky Way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((fb, i) => (
            <div 
              key={fb.id} 
              className="bg-[#131314] backdrop-blur-[20px] border border-white/5 rounded-3xl p-8 hover:border-[#00e5ff]/30 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity text-[#00e5ff]">
                <Quote size={64} />
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    size={16} 
                    className={index < fb.rating ? "fill-[#00e5ff] text-[#00e5ff]" : "text-white/20"} 
                  />
                ))}
              </div>
              
              <p className="text-white/90 leading-relaxed mb-8 relative z-10">
                "{fb.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-white/10 pt-6">
                <img src={fb.avatar} alt={fb.name} className="w-12 h-12 rounded-full border border-white/20 object-cover" />
                <div>
                  <h4 className="text-white font-bold">{fb.name}</h4>
                  <div className="text-[#00e5ff] text-sm">{fb.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
