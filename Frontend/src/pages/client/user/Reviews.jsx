import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Reviews</h2>
      <div className="flex flex-col gap-4 text-center py-20 text-white/40 items-center">
        <Star size={48} className="text-white/20" />
        <p>You haven't reviewed any products yet</p>
      </div>
    </div>
  );
}
