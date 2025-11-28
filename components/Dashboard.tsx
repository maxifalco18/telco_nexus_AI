import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Activity, Database, Server, Zap } from 'lucide-react';

const data = [
  { name: '08:00', queries: 40, latency: 240 },
  { name: '10:00', queries: 300, latency: 139 },
  { name: '12:00', queries: 200, latency: 980 },
  { name: '14:00', queries: 278, latency: 390 },
  { name: '16:00', queries: 189, latency: 480 },
  { name: '18:00', queries: 239, latency: 380 },
  { name: '20:00', queries: 349, latency: 430 },
];

const coverageData = [
  { name: 'Network', docs: 120 },
  { name: 'IT', docs: 80 },
  { name: 'Security', docs: 45 },
  { name: 'Legal', docs: 20 },
  { name: 'HR', docs: 15 },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <div className={`p-2 rounded-lg bg-opacity-20 ${color.bg}`}>
        <Icon size={20} className={color.text} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className={`text-xs ${sub.includes('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{sub}</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Ingested Docs" 
          value="12,450" 
          sub="+12% this week" 
          icon={Database} 
          color={{ bg: 'bg-blue-500', text: 'text-blue-400' }} 
        />
        <StatCard 
          title="Avg. Query Latency" 
          value="450ms" 
          sub="-8% improvement" 
          icon={Zap} 
          color={{ bg: 'bg-amber-500', text: 'text-amber-400' }} 
        />
        <StatCard 
          title="Active Sessions" 
          value="84" 
          sub="+24 active now" 
          icon={Activity} 
          color={{ bg: 'bg-emerald-500', text: 'text-emerald-400' }} 
        />
        <StatCard 
          title="System Health" 
          value="99.9%" 
          sub="All systems operational" 
          icon={Server} 
          color={{ bg: 'bg-purple-500', text: 'text-purple-400' }} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">RAG Query Volume vs Latency</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorQueries)" />
                <Area type="monotone" dataKey="latency" stroke="#f59e0b" fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Knowledge Base Coverage</h3>
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" />
                <Tooltip cursor={{fill: '#334155'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                <Bar dataKey="docs" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;