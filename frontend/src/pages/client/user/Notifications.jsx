import React from 'react';
import { Bell, Package, CheckCircle, Tag, Settings, CreditCard } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'order', title: 'Order Shipped', message: 'Your order ORD-8001 has been shipped and is on its way to your galaxy.', time: '2 hours ago', read: false, icon: Package },
  { id: 2, type: 'promo', title: 'New Spaceship Models Arrived', message: 'Check out the new Nebula Cruiser X2 with advanced hyperdrive capabilities.', time: '1 day ago', read: false, icon: Tag },
  { id: 3, type: 'system', title: 'Payment Successful', message: 'Payment of $45,000 for order ORD-8001 was processed successfully.', time: '2 days ago', read: true, icon: CreditCard },
  { id: 4, type: 'account', title: 'Security Settings Updated', message: 'Your account security settings have been updated.', time: '1 week ago', read: true, icon: Settings },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <h1 className="text-3xl text-white font-bold flex items-center gap-3">
          <Bell className="text-[#00e5ff]" />
          Notifications
        </h1>
        <button className="text-[#00e5ff] text-sm hover:text-white transition-colors font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map(notification => {
          const Icon = notification.icon;
          return (
            <div 
              key={notification.id} 
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-1 cursor-pointer ${notification.read ? 'bg-[#131314] border-white/5 opacity-70' : 'bg-white/5 border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'}`}
            >
              <div className="flex items-center justify-center shrink-0 text-[#00e5ff] pt-1">
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className={`text-lg font-bold ${notification.read ? 'text-white/80' : 'text-white'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-white/40 text-xs whitespace-nowrap">{notification.time}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  {notification.message}
                </p>
                <div className="flex items-center gap-4">
                  <button className="text-[#00e5ff] text-xs font-bold hover:text-white transition-colors">
                    View Details
                  </button>
                  {!notification.read && (
                    <button className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1">
                      <CheckCircle size={14} /> Mark as read
                    </button>
                  )}
                </div>
              </div>
              {!notification.read && (
                <div className="w-3 h-3 rounded-full bg-[#00e5ff] shrink-0 mt-2 shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
