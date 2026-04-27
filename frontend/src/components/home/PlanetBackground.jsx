import React from 'react';

export default function PlanetBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-start opacity-70">
      
      {/* Container for 3D positioning */}
      <div className="relative w-full h-full max-w-[1320px] mx-auto">
        
        {/* The Planet System - Positioned behind the text on the left */}
        <div className="absolute left-[-10%] md:left-[-5%] top-1/2 w-[500px] md:w-[700px] aspect-square animate-planet-float">
          
          {/* Back half of the ring (using clip-path to only show top half, or we can just use z-index trick) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[50%] rounded-[50%] border-[4px] border-[#00e5ff]/10 rotate-[-15deg]"
            style={{ 
              boxShadow: '0 0 80px rgba(0,229,255,0.15), inset 0 0 80px rgba(0,229,255,0.15)',
            }}
          ></div>

          {/* Glowing Aura behind planet */}
          <div className="absolute inset-0 rounded-full bg-[#00e5ff]/5 blur-[80px]"></div>

          {/* The Planet Sphere */}
          <div 
            className="absolute inset-10 rounded-full bg-[#020b12]"
            style={{
              boxShadow: 'inset -40px -40px 100px rgba(0, 191, 165, 0.2), inset 20px 20px 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 229, 255, 0.1)',
              border: '1px solid rgba(0, 229, 255, 0.05)',
              background: 'radial-gradient(circle at 30% 30%, #031422 0%, #01060a 80%)'
            }}
          ></div>

          {/* Front half of the ring */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[50%] rounded-[50%] border-b-[6px] border-l-[6px] border-r-[2px] border-t-0 border-[#00e5ff]/30 rotate-[-15deg] z-10"
            style={{ 
              boxShadow: '0 40px 80px rgba(0,229,255,0.2), inset 0 -20px 40px rgba(0,229,255,0.15)',
            }}
          >
            {/* Multiple nested rings for depth */}
            <div className="absolute inset-4 rounded-[50%] border-b-[3px] border-l-[3px] border-[#00bfa5]/20"></div>
            <div className="absolute inset-8 rounded-[50%] border-b-[4px] border-l-[4px] border-[#00e5ff]/40 shadow-[0_20px_40px_rgba(0,229,255,0.3)]"></div>
          </div>
          
          {/* Orbital dust/particles on the ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[50%] rotate-[-15deg] z-10 pointer-events-none">
            <div className="absolute bottom-[10%] left-[20%] w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_10px_#fff]"></div>
            <div className="absolute bottom-[5%] left-[50%] w-3 h-3 bg-[#00e5ff] rounded-full blur-[1px] shadow-[0_0_20px_#00e5ff]"></div>
            <div className="absolute bottom-[15%] right-[25%] w-1.5 h-1.5 bg-[#00bfa5] rounded-full blur-[1px] shadow-[0_0_10px_#00bfa5]"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
