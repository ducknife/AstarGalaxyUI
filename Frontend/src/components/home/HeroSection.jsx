import React from 'react';
import FluidStream from '../../FluidStream';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-[72px]" id="hero-section">
      <FluidStream />
      <div className="relative z-[2] text-center max-w-[900px] mx-auto px-6 animate-[fadeInUp_1s_ease-out] mb-[10vh]">
        <h1 
          className="text-[clamp(3rem,7.5vw,5.5rem)] font-light leading-[1.1] tracking-[-0.03em] mb-6 text-white" 
          style={{ textShadow: '0 4px 30px rgba(0, 0, 0, 0.8), 0 0 100px rgba(0, 0, 0, 0.6)' }}
        >
          Explore The Future<br />
          <span 
            className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text"
            style={{ filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.9))' }}
          >
            Of Galactic Technology
          </span>
        </h1>
        <p 
          className="text-[clamp(1.1rem,2.2vw,1.4rem)] text-white/90 mb-11 font-normal max-w-[650px] mx-auto"
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
        >
          Step into a world where technology meets magic. Experience breakthrough products from the future.
        </p>
        <button 
          className="group relative inline-flex items-center gap-2.5 px-10 py-4 bg-white/5 backdrop-blur-[15px] border border-[#00e5ff]/30 rounded-full text-white text-[1rem] font-semibold cursor-pointer transition-all duration-300 overflow-hidden hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,229,255,0.12),0_0_80px_rgba(0,191,165,0.06)]" 
          id="hero-cta-btn"
        >
          <div 
            className="absolute -inset-[1px] rounded-inherit p-[1px] bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
            style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', borderRadius: 'inherit' }}
          ></div>
          <span className="relative z-10">Explore Now ✦</span>
        </button>
      </div>
    </section>
  );
}
