import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Edit, Star, ChevronRight, MessageSquare, Settings, Plus, Mic, Sparkles, Image, Music, Video, PenTool, BookOpen, User, Rocket, Bot, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Chatbot() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'I am Astar AI, processing your request through the quantum network...'
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-72px)] mt-[72px] w-full flex bg-transparent text-white overflow-hidden relative z-10">
      {/* Sidebar */}
      <div className={`hidden md:flex flex-col bg-[#1b1b1b] shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isSidebarOpen ? 'w-[300px]' : 'w-[68px]'}`}>
        
        <div className="h-16 flex items-center shrink-0 px-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-[44px] h-[44px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white/80 shrink-0">
            <Menu size={20} />
          </button>
        </div>

        <div className="px-3 shrink-0 mt-2">
          <button onClick={() => setMessages([])} className="h-[44px] rounded-full bg-white/5 hover:bg-white/10 flex items-center text-[0.9rem] text-white/90 transition-all duration-300 overflow-hidden" style={{ width: isSidebarOpen ? '100%' : '44px' }}>
            <div className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
              <Edit size={18} />
            </div>
            <span className="whitespace-nowrap font-medium pr-4">New Chat</span>
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto px-3 pt-6 transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
          <div className="px-3 py-2 text-[0.8rem] font-medium text-white/80">
            Recent Chats
          </div>
          <div className="space-y-1 mt-1">
            {['Magical E-commerce Web Design...', 'Improve sleep and reduce sensitivity', 'Spring Proxy: Mechanism and errors', 'Manage Git Remote Repository', 'Troubleshoot AgentOS Boot Issue'].map((chat, i) => (
              <button key={i} className="w-full text-left px-3 py-2.5 text-[0.85rem] text-white/70 hover:bg-white/5 hover:text-white rounded-full truncate transition-colors">
                {chat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 mt-auto shrink-0">
          <button className="h-[44px] w-full rounded-full hover:bg-white/5 flex items-center text-[0.85rem] text-white/80 transition-colors overflow-hidden" style={{ width: isSidebarOpen ? '100%' : '44px' }}>
            <div className="w-[44px] h-[44px] flex items-center justify-center shrink-0">
              <Settings size={18} />
            </div>
            <span className="whitespace-nowrap font-medium pr-4">Settings & Help</span>
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto pb-32">
              <div className="text-center w-full mb-12">
                <h1 className="text-[3.5rem] font-medium bg-gradient-to-r from-[#00e5ff] to-[#b3ffff] text-transparent bg-clip-text mb-2 tracking-tight">Hello Commander!</h1>
                <h2 className="text-[3.5rem] font-medium text-white tracking-tight leading-tight">What should we explore today?</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl mx-auto">
                <button className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/90 transition-colors">
                  For You
                </button>
                <button className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/90 flex items-center gap-2 transition-colors">
                  <Rocket size={16} className="text-[#00e5ff]" /> Explore Spaceships
                </button>
                <button className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/90 flex items-center gap-2 transition-colors">
                  <Bot size={16} className="text-pink-400" /> View Robots & Drones
                </button>
                <button className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/90 flex items-center gap-2 transition-colors">
                  <Sparkles size={16} className="text-green-400" /> AI Features
                </button>
                <button className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white/90 transition-colors">
                  Upgrade Components
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-8 px-4 space-y-8 pb-32">
              {messages.map(msg => (
                <div key={msg.id} className="flex gap-4 animate-[fadeInUp_0.4s_ease-out_backwards]">
                  {msg.sender === 'bot' ? (
                    <div className="w-8 h-8 rounded-full bg-[linear-gradient(135deg,#00e5ff,#00bfa5)] shrink-0 flex items-center justify-center text-black">
                      <Sparkles size={16} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-white/70">
                      <User size={16} />
                    </div>
                  )}
                  <div className={`flex-1 text-[1rem] leading-relaxed pt-1 ${msg.sender === 'user' ? 'text-white/90' : 'text-white/80'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pt-10 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-[#1b1b1b] backdrop-blur-xl rounded-3xl min-h-[60px] flex items-end p-2 focus-within:border-[#00e5ff]/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex gap-1 shrink-0 pb-1">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                  <Plus size={22} />
                </button>
                <button className="px-3 h-10 rounded-full flex items-center gap-2 text-white/70 hover:bg-white/10 transition-colors text-sm">
                  <PenTool size={18} /> Tools
                </button>
              </div>

              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Astar AI"
                className="flex-1 bg-[#1b1b1b] border-none outline-none text-white px-4 py-3 max-h-[200px] min-h-[44px] resize-none overflow-y-auto placeholder:text-white/40 text-[1rem]"
                rows={1}
              />

              <div className="flex gap-2 shrink-0 pb-1 pr-1">
                <div className="flex items-center text-white/50 text-xs px-2 cursor-pointer hover:text-white/80">
                  Pro <ChevronRight size={14} className="ml-1 rotate-90" />
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                  <Mic size={20} />
                </button>
                {input.trim() && (
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mt-3 text-[0.75rem] text-white/40">
              Astar AI may provide inaccurate information, so please double-check its responses.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
