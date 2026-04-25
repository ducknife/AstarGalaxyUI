import React from 'react';

export default function FowardButton({ children, onClick, className = '' }) {
  return (
    <button 
      onClick={onClick}
      className={`cursor-pointer bg-white text-black font-semibold rounded-full px-6 py-2 transition-all duration-300 hover:bg-[#00e5ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}
