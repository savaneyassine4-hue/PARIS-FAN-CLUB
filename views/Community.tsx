
import React, { useState } from 'react';
import { MapPin, Users, Calendar, CheckCircle2 } from 'lucide-react';

const MOCK_EVENTS = [
  {
    id: 'e1',
    title: 'Visualisation Classico',
    location: 'Maquis La Classe, Cocody Angré',
    date: 'Dimanche à 19h00',
    description: 'Ambiance garantie, sono de folie et écrans géants.',
    attendees: 145,
    isConfirmed: true,
  },
  {
    id: 'e2',
    title: 'Tournoi Inter-Quartiers',
    location: 'Terrain Inchallah, Koumassi',
    date: 'Samedi Prochain, 08h00',
    description: 'Tournoi de Maracana spécial fans du PSG.',
    attendees: 32,
    isConfirmed: false,
  }
];

const Community: React.FC = () => {
  const [confirmed, setConfirmed] = useState<string[]>(['e1']);

  const toggleConfirm = (id: string) => {
    if (confirmed.includes(id)) {
      setConfirmed(confirmed.filter(c => c !== id));
    } else {
      setConfirmed([...confirmed, id]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-psg-blue dark:text-white uppercase">Communauté Babi</h2>
      
      {/* Interactive Map Simulation */}
      <section className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Lieux de rassemblement</h3>
          <span className="text-[10px] font-bold text-psg-red bg-psg-red/10 px-2 py-1 rounded">LIVE</span>
        </div>
        <div className="relative aspect-video bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden">
          <img 
            src="https://picsum.photos/800/450?grayscale&blur=2" 
            className="w-full h-full object-cover opacity-50"
            alt="Map background" 
          />
          {/* Animated pins */}
          <div className="absolute top-1/4 left-1/3 animate-bounce">
            <MapPin className="text-psg-red" fill="#DA121A" size={24} />
          </div>
          <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-150">
            <MapPin className="text-psg-blue" fill="#004170" size={24} />
          </div>
          <div className="absolute top-1/2 left-2/3 animate-bounce delay-300">
            <MapPin className="text-psg-red" fill="#DA121A" size={24} />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg shadow-xl text-xs font-bold dark:text-white">
                4 rassemblements en cours à Abidjan
             </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="space-y-4">
        <h3 className="font-bold text-lg dark:text-white">Événements à venir</h3>
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-psg-blue transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg text-psg-blue dark:text-blue-400">{event.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <Calendar size={14} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  <Users size={12} />
                  {event.attendees + (confirmed.includes(event.id) ? 1 : 0)} présents
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">{event.description}</p>
            
            <button 
              onClick={() => toggleConfirm(event.id)}
              className={`w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                confirmed.includes(event.id)
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-psg-blue text-white shadow-md hover:bg-psg-blue/90'
              }`}
            >
              <CheckCircle2 size={18} />
              {confirmed.includes(event.id) ? 'Je suis confirmé' : 'Je serai présent'}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Community;
