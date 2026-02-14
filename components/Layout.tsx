
import React, { useState, useEffect } from 'react';
import { Home, Users, ShoppingBag, MessageSquare, User, ShieldCheck, Sun, Moon, Image } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isAdmin }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.replace('bg-slate-50', 'bg-slate-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.replace('bg-slate-900', 'bg-slate-50');
    }
  }, [darkMode]);

  const navItems = [
    { id: 'home', icon: Home, label: 'Actu' },
    { id: 'community', icon: Users, label: 'Club' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'shop', icon: ShoppingBag, label: 'Boutique' },
    { id: 'ai', icon: Image, label: 'Studio' },
    { id: 'profile', icon: User, label: 'Moi' },
  ];

  if (isAdmin) {
    navItems.splice(4, 0, { id: 'admin', icon: ShieldCheck, label: 'Admin' });
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-50 psg-blue text-white px-4 py-3 flex justify-between items-center shadow-lg border-b border-white/10 transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Logo Circulaire Officiel */}
          <div className="relative">
            <div className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] bg-white rounded-full flex items-center justify-center p-1 shadow-[0_4px_15px_rgba(0,0,0,0.3)] border-2 border-white/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
              {!logoError ? (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/fr/4/4a/Paris_Saint-Germain_FC.svg" 
                  alt="PSG Fan Club Abidjan Logo" 
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-psg-red rounded-full flex items-center justify-center font-black text-white text-[10px]">
                  PSG
                </div>
              )}
            </div>
            {/* Petit indicateur de statut "Officiel" */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-psg-blue rounded-full shadow-sm"></div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-[11px] md:text-[13px] text-white font-black uppercase tracking-[0.15em] leading-none mb-1">
              Fan Club Officiel
            </h1>
            <p className="text-[9px] md:text-[10px] text-white/60 font-medium uppercase tracking-[0.25em]">
              Abidjan, Côte d'Ivoire
            </p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 hover:bg-white/10 rounded-full transition-all active:scale-90 border border-white/10 bg-white/5"
          aria-label="Changer le mode"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-white/90" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto max-w-4xl mx-auto w-full px-4 pt-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex justify-around items-center p-3 pb-6 md:pb-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id 
                ? 'text-psg-blue dark:text-blue-400 scale-110' 
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
