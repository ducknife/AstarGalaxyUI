import React from 'react';
import { Shield, Zap, Globe2, Rocket } from 'lucide-react';
import FowardButton from '../../components/ui/buttons/FowardButton';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="pt-[120px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20 animate-[fadeInUp_0.8s_ease-out]">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-white mb-6" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
          Our <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Mission</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
          At AstarGalaxy, we believe that the cosmos should be accessible to all. We are the premier 
          interstellar marketplace bridging the gap between advanced civilization engineering and everyday explorers.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative rounded-[40px] overflow-hidden group">
          <div className="absolute inset-0 bg-[#00e5ff]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Space station" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4">Founded in Sector 7G</h2>
          <p className="text-white/90 leading-relaxed text-lg">
            It all started with a simple idea: What if finding a reliable plasma thruster was as easy 
            as buying a cup of Earth coffee? Back in 2024, our founders noticed a severe fragmentation 
            in the galactic supply chain.
          </p>
          <p className="text-white/90 leading-relaxed text-lg">
            Today, AstarGalaxy connects over 12 million active commanders with more than 5,000 certified 
            manufacturers across the Milky Way and Andromeda galaxies. From state-of-the-art combat drones 
            to luxury cruisers, if it flies, we supply it.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="border-l-2 border-[#00e5ff] pl-4">
              <div className="text-3xl font-black text-white">5K+</div>
              <div className="text-[#00e5ff] text-sm font-medium">Global Suppliers</div>
            </div>
            <div className="border-l-2 border-[#00bfa5] pl-4">
              <div className="text-3xl font-black text-white">12M</div>
              <div className="text-[#00e5ff] text-sm font-medium">Active Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Absolute Security', desc: 'Every transaction is protected by quantum-level encryption protocols.' },
            { icon: Zap, title: 'Relentless Innovation', desc: 'We continuously push the boundaries of what e-commerce can be.' },
            { icon: Globe2, title: 'Universal Reach', desc: 'No system is too far. We guarantee delivery to the edge of the known universe.' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-[#131314] backdrop-blur-[20px] border border-white/10 rounded-3xl p-8 hover:border-[#00e5ff]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#1b1b1b] flex items-center justify-center text-[#00e5ff] mb-6">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Team CTA */}
      <div className="bg-[#021818]/60 backdrop-blur-[20px] border border-[#003d3d] rounded-[2rem] p-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-3">Join the Fleet</h2>
          <p className="text-white/80 mb-8 text-[0.9rem] font-medium leading-relaxed">
            We are always looking for brilliant engineers, quantum data scientists, and visionary designers 
            to help us build the future of cosmic commerce.
          </p>
          <button onClick={() => navigate('/contact')} className="bg-white text-black font-bold rounded-full px-5 py-2.5 text-sm hover:bg-gray-100 transition-colors cursor-pointer">
            View Open Positions
          </button>
        </div>
      </div>

    </div>
  );
}
