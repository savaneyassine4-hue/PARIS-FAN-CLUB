
import React from 'react';
import { Calendar, MapPin, ChevronRight, Trophy } from 'lucide-react';
import { NewsItem, Match } from '../types';

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Le Fan Club d’Abidjan s’agrandit !',
    content: 'Plus de 500 nouveaux membres nous ont rejoint ce mois-ci au Plateau. Ici c’est Abidjan, ici c’est Paris !',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    date: 'Il y a 2h',
  },
  {
    id: '2',
    title: 'Match Day : PSG vs Marseille',
    content: 'Rendez-vous à l’Espace 225 de Cocody pour vivre le Classico en direct sur écran géant.',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    date: 'Il y a 5h',
  }
];

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    opponent: 'Olympique de Marseille',
    opponentLogo: 'https://upload.wikimedia.org/wikipedia/fr/4/43/Logo_Olympique_de_Marseille.svg',
    date: 'Dimanche 27 Oct.',
    time: '20:45',
    competition: 'Ligue 1 McDonald’s',
    location: 'Stade Vélodrome',
  },
  {
    id: 'm2',
    opponent: 'Atletico Madrid',
    opponentLogo: 'https://upload.wikimedia.org/wikipedia/fr/9/93/Logo_Atletico_Madrid.svg',
    date: 'Mercredi 6 Nov.',
    time: '21:00',
    competition: 'UEFA Champions League',
    location: 'Parc des Princes',
  }
];

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Featured Header */}
      <section className="relative h-48 rounded-2xl overflow-hidden shadow-xl group">
        <img 
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Parc des Princes"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-psg-blue/90 via-psg-blue/40 to-transparent flex flex-col justify-end p-6 text-white">
          <span className="bg-psg-red px-2 py-1 rounded text-[10px] font-bold w-fit mb-2">À LA UNE</span>
          <h2 className="text-2xl font-bold">Le Fan Club fête ses 5 ans à Abidjan</h2>
        </div>
      </section>

      {/* Match Center */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2 dark:text-white">
            <Trophy size={20} className="text-psg-red" />
            Centre de Matchs
          </h3>
          <button className="text-psg-blue dark:text-blue-400 text-sm font-semibold">Calendrier</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {MOCK_MATCHES.map(match => (
            <div key={match.id} className="min-w-[280px] snap-center bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-4 tracking-wider flex justify-between items-center">
                <span>{match.competition}</span>
                <span className="text-psg-red">{match.date}</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-full p-1 shadow-inner">
                    <img src="https://upload.wikimedia.org/wikipedia/fr/4/4a/Paris_Saint-Germain_FC.svg" className="w-full h-full" alt="PSG" />
                  </div>
                  <span className="text-xs font-bold dark:text-white">PSG</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-slate-800 dark:text-white">VS</span>
                  <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 mt-1">{match.time}</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-full p-1 shadow-inner">
                    <img src={match.opponentLogo} className="w-full h-full" alt={match.opponent} />
                  </div>
                  <span className="text-xs font-bold dark:text-white text-center line-clamp-1">{match.opponent}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 justify-center">
                <MapPin size={10} />
                {match.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News List */}
      <section>
        <h3 className="font-bold text-lg mb-4 dark:text-white">Fil d'Actualités</h3>
        <div className="space-y-4">
          {MOCK_NEWS.map(news => (
            <div key={news.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row border border-slate-100 dark:border-slate-700 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-full sm:w-32 h-32 flex-shrink-0">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-psg-blue dark:group-hover:text-blue-400 transition-colors">{news.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{news.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Calendar size={12} className="text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-medium">{news.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
