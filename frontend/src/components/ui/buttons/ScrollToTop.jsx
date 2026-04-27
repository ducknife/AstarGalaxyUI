import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="cursor-pointer fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#00e5ff] hover:text-black hover:border-[#00e5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:-translate-y-1 z-[999] animate-[fadeInUp_0.3s_ease-out]"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
