import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/ui/buttons/SubmitButton';
import FowardButton from '../../components/ui/buttons/FowardButton';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    alert('Message sent to Astar Command! We will reply via quantum link soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-[120px] pb-20 min-h-screen relative z-10 max-w-[1320px] mx-auto px-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
          Contact <span className="bg-[linear-gradient(135deg,#ffffff,#b3ffff,#ffffff)] text-transparent bg-clip-text" style={{ filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.9))' }}>Command</span>
        </h1>
        <p className="text-white/90 text-lg leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
          Need technical support for your starship or have inquiries about our AI drone systems? 
          Establish a secure connection with our support specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-3xl p-8 hover:border-[#00e5ff]/30 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Globe className="text-[#00e5ff]" />
              Global Headquarters
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/90">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Sector 7G, Astar Tower</h3>
                  <p className="text-white/90 text-sm">Kepler-186f Space Station<br/>Milky Way Galaxy</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/90">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Secure Transmission</h3>
                  <p className="text-[#00e5ff] text-sm cursor-pointer hover:underline">contact@astargalaxy.com</p>
                  <p className="text-[#00e5ff] text-sm cursor-pointer hover:underline mt-1">support@astargalaxy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/90">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Quantum Comm-Link</h3>
                  <p className="text-white/90 text-sm">(+84) 123 456 789</p>
                  <p className="text-white/90 text-sm mt-1">Available 24/7/365</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-[#00e5ff]/30 rounded-3xl p-8 relative overflow-hidden group hover:border-[#00e5ff]/60 transition-colors duration-300">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#00e5ff]/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <MessageSquare size={32} className="text-[#00e5ff] mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Live Chat Support</h3>
            <p className="text-white/90 text-sm mb-6">Connect with our AI assistant immediately for quick resolutions.</p>
            <FowardButton onClick={() => navigate('/chat')} className="!shadow-none hover:!shadow-none text-sm w-fit">
              Start Chat
            </FowardButton>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-[#1b1b1b]/60 backdrop-blur-[20px] border border-white/5 rounded-3xl p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
            <p className="text-white/90 text-sm mb-8">We usually respond within 2 standard Earth hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/5 transition-all"
                    placeholder="Commander Shepard"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/5 transition-all"
                    placeholder="shepard@normandy.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/5 transition-all"
                  placeholder="Inquiry about Cargo Drone V2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e5ff]/50 focus:bg-white/5 transition-all resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <SubmitButton 
                className="w-full py-4 text-base bg-[#00e5ff] text-black hover:bg-[#00bfa5] border-none !shadow-none flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={18} />
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
