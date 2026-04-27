import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="h-screen pt-[72px] flex items-center justify-center px-4 md:px-6 relative z-10 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e5ff]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-5xl h-[520px] bg-[#131314] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#00e5ff]/20 flex">
        
        {/* ================= BASE LAYER (#131314) ================= */}
        
        {/* Left Side: Login Info (Visible in State 2: Register view) */}
        <div className={`absolute left-0 top-0 w-full md:w-[40%] h-full flex flex-col items-center justify-center p-8 z-0 ${isLogin ? 'opacity-0 -translate-x-32 pointer-events-none' : 'opacity-100 translate-x-0 pointer-events-auto'}`} style={{ transition: 'all 1.2s cubic-bezier(0.85, 0, 0.15, 1)' }}>
          <div className="w-16 h-16 bg-[#00e5ff]/10 rounded-full flex items-center justify-center mb-6 border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <User size={30} className="text-[#00e5ff]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Already a Member?</h2>
          <p className="text-white/60 text-center mb-8 max-w-[300px]">
            Return to your cosmic dashboard and continue your interstellar journey.
          </p>
          <button 
            onClick={() => setIsLogin(true)} 
            className="px-10 py-3 rounded-full bg-white text-black hover:bg-gray-200 font-bold transition-all duration-300 cursor-pointer"
          >
            Go to Login
          </button>
        </div>

        {/* Right Side: Login Form (Visible in State 1: Login view) */}
        <div className={`absolute right-0 top-0 w-full md:w-[55%] h-full flex flex-col items-center justify-center p-8 md:p-12 z-0 ${isLogin ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-32 pointer-events-none'}`} style={{ transition: 'all 1.2s cubic-bezier(0.85, 0, 0.15, 1)' }}>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-[#00e5ff] mb-6 text-center font-medium tracking-wide uppercase text-sm">Access the Galaxy</p>
          
          <form className="w-full max-w-sm flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/user/profile'); }}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-white/40 group-focus-within:text-[#00e5ff] transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#00e5ff]/50 focus:bg-[#00e5ff]/5 transition-all" />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-white/40 group-focus-within:text-[#00e5ff] transition-colors" />
              </div>
              <input type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-[#00e5ff]/50 focus:bg-[#00e5ff]/5 transition-all" />
            </div>
            
            <div className="flex justify-end w-full">
              <a href="#" className="text-sm text-[#00e5ff]/80 hover:text-[#00e5ff] transition-colors">Forgot Password?</a>
            </div>
            
            <button type="submit" className="mt-2 w-full bg-[linear-gradient(135deg,#00e5ff,#0097a7)] text-black font-bold text-lg rounded-xl py-3.5 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
              Login <ArrowRight size={20} />
            </button>
          </form>
        </div>


        {/* ================= OVERLAY LAYER (Cyan) ================= */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] pointer-events-none z-10 hidden md:block"
          style={{
            transition: 'clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)',
            clipPath: isLogin 
              ? 'polygon(0% 0%, 40% 0%, 45% 50%, 40% 100%, 0% 100%, 0% 50%)' 
              : 'polygon(40% 0%, 100% 0%, 100% 50%, 100% 100%, 40% 100%, 45% 50%)'
          }}
        >
          <div className="relative w-full h-full">
            
            {/* Left Side: Register Info (Visible in State 1) */}
            <div className={`absolute left-0 top-0 w-[40%] h-full flex flex-col items-center justify-center p-8 ${isLogin ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-32 pointer-events-none'}`} style={{ transition: 'all 1.2s cubic-bezier(0.85, 0, 0.15, 1)' }}>
              <h2 className="text-3xl font-black text-[#131314] mb-4 text-center leading-tight">NEW<br/>COMMANDER?</h2>
              <p className="text-[#131314]/80 text-center mb-8 font-medium">
                Join the AstarGalaxy network and explore limitless possibilities.
              </p>
              <button 
                onClick={() => setIsLogin(false)} 
                className="px-10 py-3 rounded-full bg-[#131314] text-white hover:bg-black font-bold transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                Register Now
              </button>
            </div>

            {/* Right Side: Register Form (Visible in State 2) */}
            <div className={`absolute right-0 top-0 w-[55%] h-full flex flex-col items-center justify-center p-8 lg:p-12 ${isLogin ? 'opacity-0 translate-x-32 pointer-events-none' : 'opacity-100 translate-x-0 pointer-events-auto'}`} style={{ transition: 'all 1.2s cubic-bezier(0.85, 0, 0.15, 1)' }}>
              <h2 className="text-3xl font-bold text-[#131314] mb-2">Create Account</h2>
              <p className="text-[#131314]/70 mb-6 font-bold uppercase tracking-wider text-sm">Setup your profile</p>
              
              <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsLogin(true); }}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-[#131314]/50 group-focus-within:text-[#131314] transition-colors" />
                  </div>
                  <input type="text" placeholder="Full Name" required className="w-full bg-white/20 border border-white/30 rounded-xl py-3.5 pl-12 pr-4 text-[#131314] placeholder-[#131314]/60 focus:outline-none focus:border-[#131314] focus:bg-white/30 transition-all font-medium" />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-[#131314]/50 group-focus-within:text-[#131314] transition-colors" />
                  </div>
                  <input type="email" placeholder="Email Address" required className="w-full bg-white/20 border border-white/30 rounded-xl py-3.5 pl-12 pr-4 text-[#131314] placeholder-[#131314]/60 focus:outline-none focus:border-[#131314] focus:bg-white/30 transition-all font-medium" />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-[#131314]/50 group-focus-within:text-[#131314] transition-colors" />
                  </div>
                  <input type="password" placeholder="Password" required className="w-full bg-white/20 border border-white/30 rounded-xl py-3.5 pl-12 pr-4 text-[#131314] placeholder-[#131314]/60 focus:outline-none focus:border-[#131314] focus:bg-white/30 transition-all font-medium" />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-[#131314]/50 group-focus-within:text-[#131314] transition-colors" />
                  </div>
                  <input type="password" placeholder="Confirm Password" required className="w-full bg-white/20 border border-white/30 rounded-xl py-3.5 pl-12 pr-4 text-[#131314] placeholder-[#131314]/60 focus:outline-none focus:border-[#131314] focus:bg-white/30 transition-all font-medium" />
                </div>
                
                <button type="submit" className="mt-2 w-full bg-[#131314] hover:bg-black text-white font-bold text-lg rounded-xl py-3.5 transition-all hover:-translate-y-1 cursor-pointer">
                  Sign Up
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Mobile Toggle Button (Visible only on small screens) */}
        <div className="md:hidden absolute bottom-6 left-0 w-full flex justify-center z-20">
           <button 
             onClick={() => setIsLogin(!isLogin)}
             className="text-[#00e5ff] font-medium underline cursor-pointer"
           >
             {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
           </button>
        </div>

      </div>
    </div>
  );
}
