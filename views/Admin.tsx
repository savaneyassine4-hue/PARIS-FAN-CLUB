
import React from 'react';
import { Users, TrendingUp, DollarSign, Activity, ChevronRight, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MOCK_DATA = [
  { name: 'Juin', members: 400, revenue: 800000 },
  { name: 'Juil', members: 450, revenue: 900000 },
  { name: 'Août', members: 520, revenue: 1100000 },
  { name: 'Sept', members: 610, revenue: 1250000 },
  { name: 'Oct', members: 850, revenue: 1700000 },
];

const Admin: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-psg-blue dark:text-white uppercase">Tableau de Bord</h2>
        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200 uppercase tracking-widest">Live Admin</span>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="bg-blue-100 p-2 rounded-xl w-fit mb-3"><Users className="text-blue-600" size={20} /></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase">Membres Actifs</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">1,245</p>
          <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold mt-1">
            <TrendingUp size={10} /> +12% cette semaine
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="bg-psg-red/10 p-2 rounded-xl w-fit mb-3"><DollarSign className="text-psg-red" size={20} /></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase">Revenus (CFA)</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">2.4M</p>
          <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold mt-1">
            <TrendingUp size={10} /> +8% vs dernier mois
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-sm mb-6 flex items-center gap-2 dark:text-white uppercase tracking-wider">
          <Activity size={18} className="text-psg-blue" />
          Croissance Mensuelle
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DATA}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="members" radius={[4, 4, 0, 0]}>
                {MOCK_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === MOCK_DATA.length - 1 ? '#004170' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-3">
        <h3 className="font-bold text-sm text-slate-500 ml-2 uppercase tracking-wider">Gestion Rapide</h3>
        
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-xl text-slate-600 dark:text-slate-300"><Users size={20} /></div>
            <p className="text-sm font-bold dark:text-white">Gérer les membres</p>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-xl text-slate-600 dark:text-slate-300"><FileText size={20} /></div>
            <p className="text-sm font-bold dark:text-white">Rapports Financiers</p>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>
      </section>
    </div>
  );
};

export default Admin;
