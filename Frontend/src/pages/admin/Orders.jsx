import React, { useState } from 'react';
import { Eye, Search, Filter, X, Truck, CreditCard, Box, Calendar } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

const mockOrders = [
  { id: 'ORD-8001', customer: 'Alex Mercer', date: '2026-04-26', total: 45000, payment: 'Paid', shipping: 'Shipped', items: [{ name: 'Nebula Cruiser X1', qty: 1, price: 45000 }] },
  { id: 'ORD-8002', customer: 'Sarah Connor', date: '2026-04-25', total: 210000, payment: 'Pending', shipping: 'Pending', items: [{ name: 'Galaxy Freighter', qty: 1, price: 210000 }] },
  { id: 'ORD-8003', customer: 'John Doe', date: '2026-04-24', total: 85000, payment: 'Paid', shipping: 'Processing', items: [{ name: 'Orion Interceptor', qty: 1, price: 85000 }] },
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterShipping, setFilterShipping] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [updateShippingStatus, setUpdateShippingStatus] = useState('pending');

  const getPaymentColor = (status) => status === 'Paid' ? 'text-[#1fd65f] bg-[#0a2918]' : 'text-[#eab308] bg-[#2a1f11]';
  const getShippingColor = (status) => {
    if(status === 'Shipped') return 'text-[#1fd65f] bg-[#0a2918]';
    if(status === 'Processing') return 'text-[#3b82f6] bg-[#10243e]';
    return 'text-white/60 bg-white/5';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-white mb-6">Orders Management</h1>

      {/* Filters */}
      <div className="bg-[#131314] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Search order ID or customer..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
        </div>
        <div className="flex gap-4">
          <div className="w-[180px]">
            <CustomDropdown 
              label="Shipping Status"
              options={[{label: 'Shipping Status', value: ''}, {label: 'Pending', value: 'pending'}, {label: 'Processing', value: 'processing'}, {label: 'Shipped', value: 'shipped'}]}
              selectedValue={filterShipping}
              onSelect={setFilterShipping}
            />
          </div>
          <div className="w-[180px]">
            <CustomDropdown 
              label="Payment Status"
              options={[{label: 'Payment Status', value: ''}, {label: 'Paid', value: 'paid'}, {label: 'Pending', value: 'pending'}]}
              selectedValue={filterPayment}
              onSelect={setFilterPayment}
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#131314] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Date</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Total</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Payment</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Shipping</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="p-4 font-bold text-[#00e5ff]">{order.id}</td>
                  <td className="p-4 text-white">{order.customer}</td>
                  <td className="p-4 text-white/60">{order.date}</td>
                  <td className="p-4 font-bold text-white">${order.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold ${getPaymentColor(order.payment)}`}>{order.payment}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold ${getShippingColor(order.shipping)}`}>{order.shipping}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 bg-white/5 hover:bg-[#00e5ff]/10 text-white hover:text-[#00e5ff] rounded-lg transition-colors" title="View Details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131314] w-full max-w-3xl rounded-2xl border border-white/10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-2xl text-white">Order {selectedOrder.id}</h2>
                <p className="text-white/50 text-sm mt-1 flex items-center gap-2"><Calendar size={14} /> Placed on {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-2"><CreditCard size={18} className="text-[#00e5ff]" /> Payment Log</h3>
                  <div className="text-sm text-white/70 space-y-1">
                    <p><span className="text-white/40">Status:</span> {selectedOrder.payment}</p>
                    <p><span className="text-white/40">Method:</span> Crypto Wallet (USDT)</p>
                    <p><span className="text-white/40">TxHash:</span> 0x8f...3c9a</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-2"><Truck size={18} className="text-[#00e5ff]" /> Shipping Info</h3>
                  <div className="text-sm text-white/70 space-y-1">
                    <p><span className="text-white/40">Customer:</span> {selectedOrder.customer}</p>
                    <p><span className="text-white/40">Destination:</span> Sector 7G, Alpha Centauri</p>
                    <p><span className="text-white/40">Dock:</span> Orbital Station 4</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold flex items-center gap-2 mb-4"><Box size={18} className="text-[#00e5ff]" /> Order Items</h3>
                <div className="border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5 text-sm text-white/50">
                      <tr>
                        <th className="p-3 font-medium">Item</th>
                        <th className="p-3 font-medium text-center">Qty</th>
                        <th className="p-3 font-medium text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white text-sm">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">{item.qty}</td>
                          <td className="p-3 text-right">${item.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-white/5 border-t border-white/5">
                      <tr>
                        <td colSpan="2" className="p-3 text-right font-bold text-white/70">Total:</td>
                        <td className="p-3 text-right font-bold text-[#00e5ff] text-lg">${selectedOrder.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between rounded-b-2xl">
              <div className="flex items-center gap-3">
                <div className="w-[140px]">
                  <CustomDropdown 
                    label="Update Status"
                    options={[{label: 'Pending', value: 'pending'}, {label: 'Processing', value: 'processing'}, {label: 'Shipped', value: 'shipped'}]}
                    selectedValue={updateShippingStatus}
                    onSelect={setUpdateShippingStatus}
                  />
                </div>
                <button className="px-4 py-2 bg-[#00e5ff]/10 text-[#00e5ff] rounded-lg font-bold hover:bg-[#00e5ff]/20 transition-colors text-sm">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
