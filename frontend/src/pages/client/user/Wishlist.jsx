import React from 'react';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Wishlist</h2>
      <div className="flex flex-col gap-4 text-center py-20 text-white/90 items-center">
        <Heart size={48} className="text-white/20" />
        <p>Your wishlist is currently empty</p>
      </div>
    </div>
  );
}
