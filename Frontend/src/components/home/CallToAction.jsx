import React from 'react';
import { Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FowardButton from '../ui/buttons/FowardButton';

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative z-[1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00e5ff]/5 pointer-events-none"></div>
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
        <div className="py-12 md:py-20 relative overflow-hidden">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white mb-6">
            Ready to <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Launch?</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of commanders who rely on AstarGalaxy for their interstellar equipment, 
            cutting-edge robotics, and secure quantum networks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <FowardButton onClick={() => navigate('/products')} className="w-full sm:w-auto px-10 py-4 text-base font-bold shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              Browse Catalog
            </FowardButton>
            <button onClick={() => navigate('/contact')} className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
              Contact Command
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
