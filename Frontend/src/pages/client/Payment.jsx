import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Cpu, Wallet, CreditCard } from 'lucide-react';
import SubmitButton from '../../components/ui/buttons/SubmitButton';

export default function Payment() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('crypto');

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pt-[100px] pb-20 min-h-screen relative z-10 flex items-center justify-center px-6">
        <div className="bg-[#1b1b1b]/80 backdrop-blur-[20px] border border-[#00e5ff]/30 rounded-3xl p-10 max-w-lg w-full text-center animate-[fadeInUp_0.5s_ease-out]">
          <div className="w-24 h-24 bg-[#00e5ff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#00e5ff]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Payment <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Successful!</span></h1>
          <p className="text-white/60 mb-8">Your order #ASTAR-{Math.floor(Math.random() * 1000000)} is being prepared. We will send the quantum shipping tracking code soon.</p>
          <div className="flex gap-4 justify-center">
            <SubmitButton onClick={() => navigate('/user/orders')} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white">View Order</SubmitButton>
            <SubmitButton onClick={() => navigate('/')} className="bg-[#00e5ff] text-black hover:bg-[#00bfa5] shadow-[0_0_15px_rgba(0,229,255,0.3)]">Back to Home</SubmitButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[100px] pb-20 min-h-screen relative z-10 max-w-[800px] mx-auto px-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <ShieldCheck className="text-[#00e5ff]" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-white">Secure Payment <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Gateway</span></h1>
            <p className="text-white/50 text-sm">256-bit encrypted via quantum protocol</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">Select Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setPaymentMethod('crypto')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 ${paymentMethod === 'crypto' ? 'bg-[#00e5ff]/10 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 text-white/60'}`}
            >
              <Cpu size={32} className={paymentMethod === 'crypto' ? 'text-[#00e5ff]' : ''} />
              <span className={`font-bold ${paymentMethod === 'crypto' ? 'text-[#00e5ff]' : ''}`}>Crypto (USDT/ETH)</span>
            </button>
            <button 
              onClick={() => setPaymentMethod('wallet')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 ${paymentMethod === 'wallet' ? 'bg-[#00e5ff]/10 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 text-white/60'}`}
            >
              <Wallet size={32} className={paymentMethod === 'wallet' ? 'text-[#00e5ff]' : ''} />
              <span className={`font-bold ${paymentMethod === 'wallet' ? 'text-[#00e5ff]' : ''}`}>E-Wallet (MoMo/VNPay)</span>
            </button>
            <button 
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-300 ${paymentMethod === 'card' ? 'bg-[#00e5ff]/10 border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 text-white/60'}`}
            >
              <CreditCard size={32} className={paymentMethod === 'card' ? 'text-[#00e5ff]' : ''} />
              <span className={`font-bold ${paymentMethod === 'card' ? 'text-[#00e5ff]' : ''}`}>Credit Card</span>
            </button>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70">Amount to Pay</span>
            <span className="text-3xl font-black text-[#00e5ff]">$12,050.00</span>
          </div>
          <div className="text-sm text-white/40 flex items-center gap-2">
            <ShieldCheck size={16} /> Transaction protected by AstarTech Security
          </div>
        </div>

        <SubmitButton 
          onClick={handlePayment}
          className="w-full py-4 text-lg bg-[#00e5ff] text-black hover:bg-[#00bfa5] border-none !shadow-none hover:!shadow-none flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <><div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> Processing...</>
          ) : (
            'Pay Now'
          )}
        </SubmitButton>
      </div>
    </div>
  );
}
