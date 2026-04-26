import { ShoppingCart, Heart, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../buttons/SubmitButton';
import FowardButton from '../buttons/FowardButton';

export default function ProductCard({ product, onSelect }) {
  const navigate = useNavigate();
  return (
    <div
      className="group relative border border-white/10 hover:border-aurora-cyan bg-[#131314] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-[6px] animate-[fadeInUp_0.6s_ease-out_backwards] h-full flex flex-col"
    >
      <div
        className="absolute -inset-[1px] rounded-inherit p-[1px] bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
        style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', borderRadius: 'inherit' }}
      ></div>
      <div className="w-full aspect-[4/3] overflow-hidden bg-black/50 relative flex items-center justify-center">
        {product.img ? (
          <img src={product.img} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Rocket size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
        )}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10">
          <Star size={12} className="text-[#00e5ff] fill-[#00e5ff]" />
          <span className="text-white text-[0.8rem] font-bold">{product.rating}/5</span>
        </div>
      </div>
      <div className="p-5 relative z-10 flex flex-col flex-1">
        <div className="text-[0.7rem] uppercase tracking-[0.1em] text-[#00e5ff] mb-[6px] font-semibold">{product.category}</div>
        <div className="text-[1.1rem] font-bold mb-1 text-white truncate">{product.name}</div>
        <p className="text-white text-[0.85rem] mb-3 line-clamp-2 leading-relaxed flex-1">{product.shortDes}</p>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <div className="text-[1.25rem] font-bold bg-[linear-gradient(135deg,#00e5ff,#00bfa5,#0097a7,#00e5ff)] text-transparent bg-clip-text">{product.price}</div>
          <div className="text-[0.75rem] text-white">{product.sold.toLocaleString()} sold</div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-[#00e5ff] hover:text-[#00e5ff]" title="Add to cart" onClick={(e) => e.stopPropagation()}>
              <ShoppingCart size={16} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#ff4d4f]/20 hover:border-[#ff4d4f] hover:text-[#ff4d4f]" title="Wishlist" onClick={(e) => e.stopPropagation()}>
              <Heart size={16} />
            </button>
          </div>
          <div className="flex gap-2">
            <SubmitButton onClick={() => onSelect && onSelect(product)} className="px-4">Detail</SubmitButton>
            <FowardButton 
              onClick={(e) => { e.stopPropagation(); navigate('/checkout'); }}
              className="!shadow-none hover:!shadow-none px-4"
            >
              Buy Now
            </FowardButton>
          </div>
        </div>
      </div>
    </div>
  );
}