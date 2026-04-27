import React from 'react';
import { Shield, Zap, Globe2, Rocket } from 'lucide-react';
import FowardButton from '../ui/buttons/FowardButton';
import { useNavigate } from 'react-router-dom';
import PlanetBackground from './PlanetBackground';

export default function About() {
  const navigate = useNavigate();

  const features = [
    { icon: Globe2, title: "Universal Range", desc: "Shipping across 12 known galaxies." },
    { icon: Zap, title: "Warp-Speed Delivery", desc: "Receive your order before you even placed it." },
    { icon: Shield, title: "Quantum Secure", desc: "256-bit unbreakable encryption for all payments." },
    { icon: Rocket, title: "Astar Care+", desc: "24/7 AI-driven support and maintenance." }
  ];

  return (
    <section className="py-[120px] relative z-[1]" id="about-section">
      <PlanetBackground />
      <div className="max-w-[1320px] mx-auto px-6 relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-[fadeInUp_0.8s_ease-out]">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                Redefining <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Commerce</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                AstarGalaxy is not just a marketplace; it is a nexus connecting advanced civilizations. 
                We procure the most sophisticated spacecraft, robotics, and cybernetic enhancements 
                from top-tier manufacturers across the universe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1b1b1b] flex items-center justify-center shrink-0 text-[#00e5ff]">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <FowardButton onClick={() => navigate('/about')} className="!shadow-none hover:!shadow-none px-8">
              Read Our Story
            </FowardButton>
          </div>

          {/* Visual Element */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full flex items-center justify-center group">
            <div className="absolute inset-0 bg-[#00e5ff]/5 blur-[100px] rounded-full group-hover:bg-[#00e5ff]/10 transition-colors duration-700"></div>
            <div className="relative w-4/5 h-4/5 bg-[#1b1b1b]/60 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00e5ff]/20 blur-3xl rounded-full"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] flex items-center justify-center">
                  <Globe2 size={32} className="text-black" />
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">12M+</div>
                  <div className="text-[#00e5ff] font-medium tracking-wider uppercase text-sm">Active Commanders</div>
                </div>
              </div>

              <div className="relative z-10 bg-black/40 border border-white/5 p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90 text-sm">System Status</span>
                  <span className="text-green-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Optimal
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[linear-gradient(90deg,#00e5ff,#00bfa5)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
