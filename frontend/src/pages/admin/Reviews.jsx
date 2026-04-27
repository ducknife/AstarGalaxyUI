import React, { useState } from 'react';
import { Star, Check, X, MessageSquare, CornerDownRight } from 'lucide-react';

const mockReviews = [
  { id: 1, reviewer: 'Alex Mercer', product: 'Nebula Cruiser X1', rating: 5, comment: 'Absolutely incredible ship. The warp drive is extremely smooth, and the interior is luxurious.', date: '2026-04-25', status: 'Pending', reply: null },
  { id: 2, editor: 'John Doe', reviewer: 'John Doe', product: 'Orion Interceptor', rating: 4, comment: 'Great combat ship, but the weapons systems overheat quickly.', date: '2026-04-20', status: 'Approved', reply: 'Thank you for your feedback. We are releasing a cooling system patch next month.' },
  { id: 3, reviewer: 'SpamBot99', product: 'Galaxy Freighter', rating: 1, comment: 'BUY CHEAP CRYPTO NOW!!! http://spam.link', date: '2026-04-18', status: 'Pending', reply: null },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const updateStatus = (id, newStatus) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const submitReply = (id) => {
    if(!replyText.trim()) return;
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText } : r));
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-white mb-6">Reviews & Feedback</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 rounded-xl font-bold">All Reviews</button>
        <button className="px-4 py-2 bg-white/5 text-white/70 border border-white/10 rounded-xl font-medium hover:bg-white/10">Pending</button>
        <button className="px-4 py-2 bg-white/5 text-white/70 border border-white/10 rounded-xl font-medium hover:bg-white/10">Approved</button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#131314] rounded-2xl border border-white/5 p-6 transition-all hover:border-white/10">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#00bfa5] flex items-center justify-center font-bold text-black">
                    {review.reviewer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{review.reviewer}</h3>
                    <p className="text-xs text-white/50">on <span className="text-[#00e5ff]">{review.product}</span> • {review.date}</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={16} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"} />
                  ))}
                </div>

                <p className="text-white/80 leading-relaxed">
                  "{review.comment}"
                </p>

                {review.reply && (
                  <div className="mt-4 bg-white/5 rounded-xl p-4 border border-white/10 flex gap-3">
                    <CornerDownRight size={20} className="text-[#00e5ff] shrink-0 mt-1" />
                    <div>
                      <p className="text-[#00e5ff] text-sm font-bold mb-1">AstarGalaxy Admin Response</p>
                      <p className="text-white/70 text-sm">{review.reply}</p>
                    </div>
                  </div>
                )}

                {replyingTo === review.id && (
                  <div className="mt-4 flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Write your official response..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#00e5ff]/50"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      autoFocus
                    />
                    <button onClick={() => submitReply(review.id)} className="px-4 py-2 bg-[#00e5ff] text-black rounded-xl font-bold hover:bg-[#00bfa5] text-sm">Send</button>
                    <button onClick={() => { setReplyingTo(null); setReplyText(''); }} className="px-4 py-2 bg-white/5 text-white rounded-xl hover:bg-white/10 text-sm">Cancel</button>
                  </div>
                )}
              </div>

              <div className="flex md:flex-col items-center justify-end md:justify-start gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 shrink-0 min-w-[150px]">
                {review.status === 'Pending' && (
                  <button onClick={() => updateStatus(review.id, 'Approved')} className="w-full py-2 bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-colors">
                    <Check size={16} /> Approve
                  </button>
                )}
                
                {review.status === 'Approved' && (
                  <span className="w-full py-2 bg-green-500/5 text-green-400/50 border border-green-500/10 rounded-lg flex items-center justify-center gap-2 font-bold text-sm cursor-not-allowed">
                    <Check size={16} /> Approved
                  </span>
                )}

                {!review.reply && review.status === 'Approved' && (
                  <button onClick={() => setReplyingTo(review.id)} className="w-full py-2 bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20 hover:bg-[#00e5ff]/20 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-colors">
                    <MessageSquare size={16} /> Reply
                  </button>
                )}

                <button onClick={() => updateStatus(review.id, 'Hidden')} className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-colors mt-auto">
                  <X size={16} /> Hide / Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
