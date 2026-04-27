import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, ShoppingCart, Users, CheckCircle, TrendingUp } from 'lucide-react';

const revenueData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 3200 },
  { name: 'Fri', total: 2800 },
  { name: 'Sat', total: 4500 },
  { name: 'Sun', total: 3800 },
];

const categoryData = [
  { name: 'Combat Ships', value: 65 },
  { name: 'Civilian Ships', value: 35 },
];
const COLORS = ['#00e5ff', '#8b5cf6'];

export default function Dashboard() {
  const metrics = [
    { title: 'Total Revenue', value: '$245,890', icon: DollarSign, trend: '+12.5%', isUp: true },
    { title: 'New Orders', value: '1,245', icon: ShoppingCart, trend: '+8.2%', isUp: true },
    { title: 'Active Users', value: '45,210', icon: Users, trend: '-2.4%', isUp: false },
    { title: 'Voucher Usage', value: '84.2%', icon: CheckCircle, trend: '+4.1%', isUp: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-white">Dashboard Overview</h1>
        <button className="px-4 py-2 bg-[#00e5ff]/10 text-[#00e5ff] rounded-xl border border-[#00e5ff]/20 font-medium hover:bg-[#00e5ff]/20 transition-colors flex items-center gap-2">
          <TrendingUp size={18} /> Generate Report
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#131314] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-[#00e5ff]/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <m.icon size={64} className="text-[#00e5ff]" />
            </div>
            <div className="relative z-10">
              <p className="text-white/50 text-sm font-medium mb-1">{m.title}</p>
              <h3 className="text-3xl text-white mb-2">{m.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded ${m.isUp ? 'bg-[#0a2918] text-[#1fd65f]' : 'bg-[#2a1114] text-[#ff4d4d]'}`}>
                {m.trend} from last week
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#131314] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-lg text-white mb-6">Revenue Timeline</h3>
          <div className="h-[300px] w-full relative">
            {/* Hologram background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-xl"></div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#00e5ff40" tick={{fill: '#00e5ff80', fontSize: 11, fontFamily: 'monospace'}} axisLine={{ stroke: '#00e5ff40' }} tickLine={{ stroke: '#00e5ff40' }} />
                <YAxis stroke="#00e5ff40" tick={{fill: '#00e5ff80', fontSize: 11, fontFamily: 'monospace'}} axisLine={{ stroke: '#00e5ff40' }} tickLine={{ stroke: '#00e5ff40' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(19, 19, 20, 0.9)', borderColor: '#00e5ff50', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#00e5ff', fontWeight: 'bold' }}
                />
                <Area type="linear" dataKey="total" stroke="#00e5ff" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#131314] border border-white/5 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg text-white mb-6">Sales by Category</h3>
          <div className="flex-1 min-h-[300px] relative">
            {/* Radar ring effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-[#00e5ff]/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-32 h-32 rounded-full border border-[#8b5cf6]/20 animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(19, 19, 20, 0.9)', borderColor: '#00e5ff50', borderRadius: '8px', backdropFilter: 'blur(10px)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm text-white/70">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-[#131314] border border-white/5 p-6 rounded-2xl">
        <h3 className="text-lg text-white mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#00e5ff]/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex items-center justify-center">
                  <ShoppingCart size={18} className="text-[#00e5ff]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">New order #ORD-{8000+i}</p>
                  <p className="text-xs text-white/50">Purchased: Nebula Cruiser X1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#00e5ff]">$4,500.00</p>
                <p className="text-xs text-white/50">2 mins ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
