import React, { useState, useRef, useEffect } from 'react';

export default function CustomDropdown({ label, options, onSelect, selectedValue, variant = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === selectedValue) || options[0];

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <div>
        <button 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          className={
            variant === 'nav' 
              ? "inline-flex items-center gap-1 text-[0.9rem] font-medium text-white hover:text-white transition-colors duration-200 py-2 group-hover:text-white"
              : "inline-flex justify-between items-center w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-2.5 text-sm font-medium text-white hover:border-white/20 hover:bg-[#252525] focus:outline-none focus:ring-1 focus:ring-[#00e5ff] transition-all duration-200"
          }
        >
          <span className="truncate">{selectedOption ? selectedOption.label : label}</span>
          <span className={`ml-2 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>

      {isOpen && (
        <div className={`absolute z-50 mt-2 ${variant === 'nav' ? 'w-[200px] left-1/2 -translate-x-1/2' : 'w-full origin-top-right'} rounded-xl bg-[#1b1b1b] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-white/10 overflow-hidden animate-[fadeInDown_0.2s_ease-out]`}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                }}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                  selectedValue === option.value
                    ? 'bg-[#00e5ff]/10 text-[#00e5ff]'
                    : 'text-white hover:bg-[#00e5ff] hover:text-black'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
