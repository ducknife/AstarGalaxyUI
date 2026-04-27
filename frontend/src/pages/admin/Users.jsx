import React, { useState } from 'react';
import { Shield, ShieldOff, Search, Eye, Filter, Plus, X } from 'lucide-react';
import CustomDropdown from '../../components/ui/dropdown/CustomDropdown';

const mockUsers = [
  { id: 'USR-001', username: 'Alex Mercer', email: 'alex@example.com', role: 'Admin', status: 'Active', avatar: 'A' },
  { id: 'USR-002', username: 'Sarah Connor', email: 'sarah@example.com', role: 'User', status: 'Active', avatar: 'S' },
  { id: 'USR-003', username: 'SpamBot99', email: 'spam@bot.net', role: 'User', status: 'Banned', avatar: 'S' },
  { id: 'USR-004', username: 'John Doe', email: 'john.doe@example.com', role: 'User', status: 'Active', avatar: 'J' },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [newRole, setNewRole] = useState('user');

  const toggleBan = (id) => {
    setUsers(users.map(u => {
      if(u.id === id) {
        return { ...u, status: u.status === 'Banned' ? 'Active' : 'Banned' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-white">Users Management</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#00e5ff] text-black rounded-xl hover:bg-[#00bfa5] font-bold transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#131314] w-full max-w-md rounded-2xl border border-white/10 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl text-white">Add New User</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Username</label>
                <input type="text" required placeholder="e.g. Commander Sheppard" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Email Address</label>
                <input type="email" required placeholder="email@domain.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Role</label>
                <CustomDropdown 
                  label="Role"
                  options={[{label: 'User', value: 'user'}, {label: 'Admin', value: 'admin'}]}
                  selectedValue={newRole}
                  onSelect={setNewRole}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Temporary Password</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-3 bg-[#00e5ff] hover:bg-[#00bfa5] text-black font-bold rounded-xl transition-colors">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-[#131314] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input type="text" placeholder="Search username or email..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors" />
        </div>
        <div className="flex gap-4">
          <div className="w-[180px]">
            <CustomDropdown 
              label="All Roles"
              options={[{label: 'All Roles', value: ''}, {label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}]}
              selectedValue={filterRole}
              onSelect={setFilterRole}
            />
          </div>
          <div className="w-[180px]">
            <CustomDropdown 
              label="Status"
              options={[{label: 'Status', value: ''}, {label: 'Active', value: 'active'}, {label: 'Banned', value: 'banned'}]}
              selectedValue={filterStatus}
              onSelect={setFilterStatus}
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
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">User</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Role</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider">Status</th>
                <th className="p-4 text-sm font-bold text-white/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex items-center justify-center font-bold text-[#00e5ff] border border-[#00e5ff]/20">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.username}</p>
                        <p className="text-xs text-white/50">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${user.role === 'Admin' ? 'bg-[#1e1332] text-[#c084fc]' : 'bg-white/5 text-white/70'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-[#0a2918] text-[#1fd65f]' : 'bg-[#2a1114] text-[#ff4d4d]'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white/5 hover:bg-[#00e5ff]/10 text-white hover:text-[#00e5ff] rounded-lg transition-colors" title="View History">
                        <Eye size={16} />
                      </button>
                      {user.role !== 'Admin' && (
                        <button 
                          onClick={() => toggleBan(user.id)}
                          className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold px-3 ${user.status === 'Active' ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'}`} 
                          title={user.status === 'Active' ? 'Ban User' : 'Unban User'}
                        >
                          {user.status === 'Active' ? <><ShieldOff size={16} /> Ban</> : <><Shield size={16} /> Unban</>}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
