import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Ticket, Check } from 'lucide-react';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

export default function Checkout() {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState('warp');

  const shippingOptions = [
    { id: 'standard', name: 'Standard Interstellar', price: 50, time: '3-5 Earth Days' },
    { id: 'warp', name: 'Warp Drive Express', price: 150, time: 'Estimated: 28/04/2026 - 30/04/2026' },
    { id: 'quantum', name: 'Quantum Teleportation', price: 500, time: 'Instant Delivery' },
  ];

  const currentShipping = shippingOptions.find(opt => opt.id === shippingMethod);
  const subtotal = 12000;
  const shippingFee = currentShipping?.price || 0;
  const total = subtotal + shippingFee;

  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <h1 className="text-3xl text-white mb-8 border-b border-white/10 pb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Order <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Confirmation</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Product Info */}
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product</h2>
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-black/40 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/cargo.glb" alt="Product" className="w-full h-full object-cover opacity-50" onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; e.target.onerror = null; }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-white mb-1">Astar Cargo Drone V2</div>
                <div className="text-sm text-white/90 mb-2">Provider: AstarTech Heavy Industries</div>
                <div className="text-[#00e5ff] font-bold">$12,000.00</div>
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="font-bold text-white mb-1">Commander Niev</div>
              <div className="text-white/90 text-sm mb-1">(+84) 987 654 321</div>
              <div className="text-white/90 text-sm">Kepler-186f Space Station, Sector 7G</div>
            </div>
            <button className="text-[#00e5ff] text-sm font-bold mt-3 hover:underline">Change Address</button>
          </div>

          {/* Delivery & Warranty */}
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Shipping Method</h2>
            <div className="space-y-3">
              {shippingOptions.map(option => (
                <label 
                  key={option.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                    shippingMethod === option.id 
                      ? 'bg-[#00e5ff]/10 border-[#00e5ff]' 
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="shipping" 
                    value={option.id}
                    checked={shippingMethod === option.id}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="hidden"
                  />
                  {/* Custom Check Radio */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
                    shippingMethod === option.id ? 'bg-[#00e5ff] border-[#00e5ff]' : 'border-white/40'
                  }`}>
                    <Check size={12} strokeWidth={4} className={`text-black transition-transform duration-200 ${
                      shippingMethod === option.id ? 'scale-100' : 'scale-0'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className={shippingMethod === option.id ? 'text-[#00e5ff]' : 'text-white/50'} />
                        {option.name}
                      </div>
                      <span className="text-[#00e5ff] font-bold">${option.price}.00</span>
                    </div>
                    <div className="text-white/70 text-sm mt-1">{option.time}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-green-400 mt-0.5 shrink-0" size={20} />
                <div>
                  <div className="text-white font-medium">Astar Care+ Warranty</div>
                  <div className="text-white/90 text-sm">2-year warranty for quantum core engine</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-6 cursor-pointer hover:bg-white/10 transition-colors">
              <Ticket className="text-[#00e5ff]" size={20} />
              <div className="flex-1 text-sm text-white/90">Select or enter Voucher code</div>
              <div className="text-[#00e5ff] font-bold text-lg">&rsaquo;</div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-6 cursor-pointer hover:bg-white/10 transition-colors">
              <CreditCard className="text-[#00e5ff]" size={20} />
              <div className="flex-1 text-sm text-white/90">Payment Method</div>
              <div className="text-[#00e5ff] font-bold text-lg">&rsaquo;</div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-white/90">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Shipping Fee</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Voucher Discount</span>
                <span className="text-green-400">-$0.00</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 my-4"></div>
            
            <div className="flex justify-between text-white font-bold text-lg mb-6">
              <span>Total Amount</span>
              <span className="text-[#00e5ff] text-2xl">${total.toLocaleString()}.00</span>
            </div>
            
            <SubmitButton 
              onClick={() => navigate('/payment')}
              className="w-full py-4 text-lg bg-[#00e5ff] text-black hover:bg-[#00bfa5] border-none !shadow-none hover:!shadow-none"
            >
              Place Order
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
}
