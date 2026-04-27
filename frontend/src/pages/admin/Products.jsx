import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

const mockProducts = [
  { id: '1', name: 'Nebula Cruiser X1', price: 45000, stock: 12, status: 'In Stock', category: 'Combat Ships', image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=150&auto=format&fit=crop' },
  { id: '2', name: 'Starlight Voyager', price: 125000, stock: 0, status: 'Out of Stock', category: 'Civilian Ships', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop' },
  { id: '3', name: 'Orion Interceptor', price: 85000, stock: 5, status: 'In Stock', category: 'Combat Ships', image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=150&auto=format&fit=crop' },
  { id: '4', name: 'Galaxy Freighter', price: 210000, stock: 2, status: 'In Stock', category: 'Civilian Ships', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=150&auto=format&fit=crop' },
];

export default function Products() {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl text-white">Products Management</h1>
        <div className="flex gap-3">
          <Link to="/admin/categories" className="px-4 py-2 bg-[#131314] text-white rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium">
            Categories
          </Link>
          <Link to="/admin/products/add" className="px-4 py-2 bg-[#00e5ff] text-black rounded-xl font-bold hover:bg-[#00bfa5] transition-colors flex items-center gap-2">
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#131314] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Search spaceships..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
        </div>
        <div className="flex gap-4">
          <div className="w-[180px]">
            <CustomDropdown 
              label="All Categories"
              options={[{label: 'All Categories', value: ''}, {label: 'Combat Ships', value: 'combat'}, {label: 'Civilian Ships', value: 'civilian'}]}
              selectedValue={filterCategory}
              onSelect={setFilterCategory}
            />
          </div>
          <div className="w-[180px]">
            <CustomDropdown 
              label="Status"
              options={[{label: 'Status', value: ''}, {label: 'In Stock', value: 'in_stock'}, {label: 'Out of Stock', value: 'out_stock'}, {label: 'Hidden', value: 'hidden'}]}
              selectedValue={filterStatus}
              onSelect={setFilterStatus}
            />
          </div>
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#131314] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Product</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Category</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Price</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Stock</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                      <span className="font-bold text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/70">{product.category}</td>
                  <td className="p-4 font-bold text-[#00e5ff]">${product.price.toLocaleString()}</td>
                  <td className="p-4 text-white/70">{product.stock} units</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                      product.status === 'In Stock' 
                        ? 'bg-[#0a2918] text-[#1fd65f]' 
                        : 'bg-[#2a1114] text-[#ff4d4d]'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white/5 hover:bg-[#00e5ff]/10 text-white hover:text-[#00e5ff] rounded-lg transition-colors" title="Preview">
                        <Eye size={16} />
                      </button>
                      <Link to={`/admin/products/edit/${product.id}`} className="p-2 bg-white/5 hover:bg-yellow-500/10 text-white hover:text-yellow-500 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </Link>
                      <button className="p-2 bg-white/5 hover:bg-red-500/10 text-white hover:text-red-500 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-white/50">
          <span>Showing 1 to 4 of 4 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 rounded">1</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
