import React from 'react';

export default function FowardButton({ children, onClick, className = '' }) {
  return (
    <button 
      onClick={onClick}
      className={`cursor-pointer bg-white text-black font-semibold rounded-full px-6 py-2 transition-all duration-300 hover:bg-[#00e5ff] hover:text-black ${className}`}
    >
      {children}
    </button>
  );
}
