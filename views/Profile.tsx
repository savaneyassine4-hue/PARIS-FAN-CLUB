
import React from 'react';
import { Settings, CreditCard, History, BadgeCheck, MapPin, ChevronRight, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-psg-blue rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-psg-red rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-[80px] opacity-20"></div>
        
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <img 
              src="https://picsum.photos/150/150?random=100" 
              className="w-24 h-24 rounded-full border-4 border-white/20 shadow-2xl object-cover" 
              alt="Avatar"
            />
            <div className="absolute bottom-0 right-0 bg-psg-red p-1.5 rounded-full border-2 border-psg-blue">
               <BadgeCheck size={16} fill="white" className="text-psg-red" />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-black uppercase tracking-tight">Abdoulaye Koné</h2>
          <div className="flex items-center gap-1.5 mt-1 text-white/70 text-sm font-medium">
            <MapPin size={14} />
            <span>Marcory Residentiel</span>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">MEMBRE PREMIUM</span>
            <span className="bg-psg-red px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-psg-red/20">ABIDJAN</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'MATCHS', val: '14' },
          { label: 'POINTS', val: '850' },
          { label: 'COTISE', val: '100%' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 p-3 rounded-2xl text-center shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1">{stat.label}</p>
            <p className="text-lg font-black text-psg-blue dark:text-blue-400">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 ml-2 uppercase tracking-wider">Compte & Cotisations</h3>
        
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-psg-blue/10 p-2 rounded-xl text-psg-blue"><CreditCard size={20} /></div>
            <div className="text-left">
              <p className="text-sm font-bold dark:text-white">Payer ma cotisation</p>
              <p className="text-[10px] text-slate-500">Mensuel : 2.000 FCFA</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-psg-red/10 p-2 rounded-xl text-psg-red"><History size={20} /></div>
            <div className="text-left">
              <p className="text-sm font-bold dark:text-white">Historique des paiements</p>
              <p className="text-[10px] text-slate-500">6 derniers mois en règle</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-xl text-slate-500"><Settings size={20} /></div>
            <p className="text-sm font-bold dark:text-white">Paramètres du profil</p>
          </div>
          <ChevronRight size={18} className="text-slate-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 mt-6 bg-psg-red/5 rounded-2xl border border-psg-red/10 text-psg-red font-bold text-sm hover:bg-psg-red/10 transition-all">
           <div className="flex items-center gap-3">
            <LogOut size={20} />
            <span>Se déconnecter</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
