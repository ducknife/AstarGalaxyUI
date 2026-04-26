import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, Plus, Trash2, Box } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

export default function AddEditProduct() {
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState([{ id: 1, key: 'Engine Type', value: 'Ion' }]);
  const [productCategory, setProductCategory] = useState('combat');
  const [productStatus, setProductStatus] = useState('published');

  const addAttribute = () => {
    setAttributes([...attributes, { id: Date.now(), key: '', value: '' }]);
  };

  const removeAttribute = (id) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-3xl text-white">Add New Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl text-white mb-4 border-b border-white/5 pb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Product Name</label>
                <input type="text" placeholder="e.g. Nebula Cruiser X1" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Slug</label>
                  <input type="text" placeholder="nebula-cruiser-x1" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Price ($)</label>
                  <input type="number" placeholder="45000" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
                </div>
              </div>

              <div>
                <CustomDropdown 
                  label="Category"
                  options={[{label: 'Combat Ships', value: 'combat'}, {label: 'Civilian Ships', value: 'civilian'}, {label: 'Freighters', value: 'freighter'}]}
                  selectedValue={productCategory}
                  onSelect={setProductCategory}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                <textarea rows="4" placeholder="Detailed description of the spacecraft..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Dynamic Attributes */}
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h2 className="text-xl text-white">Dynamic Attributes</h2>
              <button type="button" onClick={addAttribute} className="px-3 py-1.5 bg-[#00e5ff]/10 text-[#00e5ff] rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#00e5ff]/20 transition-colors">
                <Plus size={16} /> Add Attribute
              </button>
            </div>
            
            <div className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.id} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input type="text" placeholder="Key (e.g. Engine Type)" defaultValue={attr.key} className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors text-sm" />
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder="Value (e.g. Ion)" defaultValue={attr.value} className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors text-sm" />
                  </div>
                  <button onClick={() => removeAttribute(attr.id)} className="p-2.5 text-white/40 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-xl transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {attributes.length === 0 && (
                <p className="text-white/40 text-center py-4 text-sm">No attributes added. Click "Add Attribute" to define custom specs.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column - Media & Actions */}
        <div className="space-y-8">
          
          {/* Media Section */}
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl text-white mb-4 border-b border-white/5 pb-4">Media</h2>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Product Thumbnail (2D)</label>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#00e5ff]/50 transition-colors bg-white/5 cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#00e5ff]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={24} className="text-[#00e5ff]" />
                </div>
                <p className="text-white font-medium mb-1">Click or drag image to upload</p>
                <p className="text-white/40 text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">3D Model URL (.glb)</label>
              <div className="relative">
                <Box size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input type="text" placeholder="/models/spaceship.glb" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors text-sm" />
              </div>
              <p className="text-xs text-white/40 mt-2">Enter the URL path to the 3D model file for the interactive viewer.</p>
            </div>
          </div>

          {/* Status & Save */}
          <div className="bg-[#131314] p-6 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl text-white mb-4 border-b border-white/5 pb-4">Publishing</h2>
            
            <div>
              <CustomDropdown 
                label="Status"
                options={[{label: 'Draft', value: 'draft'}, {label: 'Published (In Stock)', value: 'published'}, {label: 'Hidden', value: 'hidden'}]}
                selectedValue={productStatus}
                onSelect={setProductStatus}
              />
            </div>

            <button className="w-full py-4 bg-[linear-gradient(135deg,#00e5ff,#0097a7)] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
              <Save size={20} /> Save Product
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
