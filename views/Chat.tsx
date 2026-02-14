
import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, TrendingUp, BarChart3 } from 'lucide-react';

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'poll'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', user: 'Kouassi (Président)', text: 'Bienvenue à tous les nouveaux membres d’Abidjan ! 🇨🇮', time: '09:41', isMe: false },
    { id: '2', user: 'Yao', text: 'On gagne combien ce soir ? Paris est magique !', time: '10:05', isMe: false },
    { id: '3', user: 'Moi', text: '3-0 facile pour Paris ! Mbappé x2 et Dembele.', time: '10:06', isMe: true },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      user: 'Moi',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-psg-blue text-white shadow-md' : 'text-slate-400'}`}
        >
          <Hash size={16} /> Salon Global
        </button>
        <button 
          onClick={() => setActiveTab('poll')}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'poll' ? 'bg-psg-blue text-white shadow-md' : 'text-slate-400'}`}
        >
          <BarChart3 size={16} /> Sondages
        </button>
      </div>

      {activeTab === 'chat' ? (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
                {!m.isMe && <span className="text-[10px] font-bold text-slate-500 mb-1 ml-2 uppercase tracking-tighter">{m.user}</span>}
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  m.isMe 
                    ? 'bg-psg-blue text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  {m.text}
                  <div className={`text-[8px] mt-1 text-right ${m.isMe ? 'text-white/60' : 'text-slate-400'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écris ton message ici..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-psg-blue dark:text-white shadow-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-psg-blue text-white p-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6 overflow-y-auto pr-2">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-psg-red" size={20} />
              <h3 className="font-bold dark:text-white">Homme du match ?</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Ousmane Dembele', votes: 45 },
                { name: 'Bradley Barcola', votes: 32 },
                { name: 'Achraf Hakimi', votes: 23 },
              ].map((option) => (
                <div key={option.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{option.name}</span>
                    <span>{option.votes}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-psg-blue" style={{ width: `${option.votes}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 text-center">852 membres ont déjà voté</p>
          </div>

          <div className="p-4 bg-psg-red/5 border border-psg-red/10 rounded-xl text-center">
             <p className="text-xs text-psg-red font-medium">Connecte-toi pendant le match pour les sondages en direct !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
