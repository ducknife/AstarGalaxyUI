import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export default function Search({ placeholder = "Search...", onSearch, className = "" }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl transition-all duration-300 ease-out flex items-center
        ${isFocused 
          ? 'bg-[#1b1b1b] border-cyan-400/50 scale-[1.01]' 
          : 'bg-[#1b1b1b] border-white/10 hover:border-white/20 hover:bg-[#252525]'
        } 
        border rounded-full overflow-hidden ${className}`}
    >
      <div className="pl-5 pr-3 text-white/50 flex items-center justify-center pointer-events-none">
        <SearchIcon size={20} className={`transition-colors duration-300 ${isFocused ? 'text-[#00e5ff]' : ''}`} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-white text-[1rem] py-3.5 px-2 placeholder-white/40 font-medium"
      />
      
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="pr-5 pl-2 text-white/40 hover:text-white transition-colors focus:outline-none"
        >
          <X size={18} />
        </button>
      )}

      {/* Hidden submit button to allow Enter key submission */}
      <button type="submit" className="hidden">Search</button>
    </form>
  );
}
