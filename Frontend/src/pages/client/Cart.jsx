import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FowardButton from '../../components/ui/buttons/FowardButton';

export default function Cart() {
  const navigate = useNavigate();
  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Shopping <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Cart</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col gap-4 text-center py-20 text-white/90 items-center">
            <ShoppingCart size={48} className="text-white/20" />
            <p>Your cart is currently empty</p>
            <FowardButton onClick={() => navigate('/products')} className="mt-4 text-sm !shadow-none hover:!shadow-none">Continue Shopping</FowardButton>
          </div>
        </div>
        <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
          <div className="flex justify-between text-white/90 mb-4">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-white/90 mb-4">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-white/10 my-4"></div>
          <div className="flex justify-between text-white font-bold text-lg mb-6">
            <span>Total</span>
            <span className="text-[#00e5ff]">$0.00</span>
          </div>
          <FowardButton onClick={() => navigate('/checkout')} className="w-full py-3 !shadow-none hover:!shadow-none">
            Checkout
          </FowardButton>
        </div>
      </div>
    </div>
  );
}
