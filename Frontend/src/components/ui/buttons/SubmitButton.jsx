import React from 'react';

export default function SubmitButton({ children, onClick, className = '' }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 bg-white/5 border border-white/10 hover:bg-[#00e5ff] hover:text-black hover:border-[#00e5ff] transition-colors rounded-full text-white text-sm font-bold w-fit cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
