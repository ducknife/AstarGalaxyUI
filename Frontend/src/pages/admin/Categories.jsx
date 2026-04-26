import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Layers } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

export default function Categories() {
  const [activeTab, setActiveTab] = useState('categories');
  const [parentCategory, setParentCategory] = useState('');

  const categories = [
    { id: 1, name: 'Combat Ships', description: 'Military and tactical vessels', count: 45 },
    { id: 2, name: 'Civilian Ships', description: 'Personal and transport vessels', count: 120 },
    { id: 3, name: 'Freighters', description: 'Cargo and logistics ships', count: 32 },
  ];

  const suppliers = [
    { id: 1, name: 'AeroSpace Dynamics', contact: 'contact@asd.space', count: 15 },
    { id: 2, name: 'NovaCorp', contact: 'sales@novacorp.int', count: 42 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <h1 className="text-3xl text-white mb-8">Categories & Suppliers</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === 'categories' ? 'text-[#00e5ff] border-b-2 border-[#00e5ff] bg-[#00e5ff]/5' : 'text-white/50 hover:text-white'}`}
        >
          <Layers size={20} /> Categories
        </button>
        <button 
          onClick={() => setActiveTab('suppliers')}
          className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors ${activeTab === 'suppliers' ? 'text-[#00e5ff] border-b-2 border-[#00e5ff] bg-[#00e5ff]/5' : 'text-white/50 hover:text-white'}`}
        >
          <Tag size={20} /> Suppliers
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Left Column - Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 sticky top-24">
            <h2 className="text-xl text-white mb-6">Add New {activeTab === 'categories' ? 'Category' : 'Supplier'}</h2>
            
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                <input type="text" placeholder={`e.g. ${activeTab === 'categories' ? 'Exploration' : 'Stellar Tech'}`} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>

              {activeTab === 'categories' && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Parent Category (Optional)</label>
                  <CustomDropdown 
                    label="Parent Category (Optional)"
                    options={[{label: 'None', value: ''}, {label: 'Combat Ships', value: '1'}, {label: 'Civilian Ships', value: '2'}]}
                    selectedValue={parentCategory}
                    onSelect={setParentCategory}
                  />
                </div>
              )}

              {activeTab === 'suppliers' && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Contact Email</label>
                  <input type="email" placeholder="email@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                <textarea rows="4" placeholder="Brief description..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-3 bg-[#00e5ff] hover:bg-[#00bfa5] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mt-2">
                <Plus size={18} /> Add {activeTab === 'categories' ? 'Category' : 'Supplier'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Data Table */}
        <div className="lg:col-span-2">
          <div className="bg-[#131314] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">{activeTab === 'categories' ? 'Description' : 'Contact'}</th>
                  <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Items</th>
                  <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'categories' ? categories : suppliers).map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 font-bold text-white">{item.name}</td>
                    <td className="p-4 text-white/60">{activeTab === 'categories' ? item.description : item.contact}</td>
                    <td className="p-4 text-[#00e5ff] font-medium">{item.count}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/5 hover:bg-yellow-500/10 text-white hover:text-yellow-500 rounded-lg transition-colors" title="Edit">
                          <Edit size={16} />
                        </button>
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
        </div>

      </div>
    </div>
  );
}
