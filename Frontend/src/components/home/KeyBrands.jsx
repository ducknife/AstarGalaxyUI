import React from 'react';

const brands = [
  "AstarTech Heavy Industries",
  "QuantumCore Systems",
  "Nebula Laboratories",
  "StarForge Arsenal",
  "NovaDynamics",
  "Orion Space Systems",
  "HyperDrive Inc",
  "VoidCorp Exploration",
  "Cosmic Robotics",
  "Starlight Aeronautics"
];

export default function KeyBrands() {
  return (
    <section className="py-20 relative z-[1] overflow-hidden border-y border-white/5 bg-[#1b1b1b]/30 backdrop-blur-sm">
      <div className="max-w-[1320px] mx-auto px-6 mb-10 text-center relative z-10">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-white">
          Trusted by <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Galactic Enterprises</span>
        </h2>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        {/* Left and Right Fade masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Double the list to ensure seamless looping */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div 
              key={index} 
              className="px-8 py-4 mx-4 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md whitespace-nowrap text-white/60 font-medium tracking-wide hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all duration-300 cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </section>
  );
}