
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './views/Home';
import Community from './views/Community';
import Shop from './views/Shop';
import Chat from './views/Chat';
import Profile from './views/Profile';
import Admin from './views/Admin';
import AIEditor from './views/AIEditor';
import { User, Role } from './types';

// Initial Mock User
const MOCK_USER: User = {
  id: 'u1',
  name: 'Abdoulaye Koné',
  email: 'abdou@psg-abidjan.ci',
  photoUrl: 'https://picsum.photos/100/100',
  neighborhood: 'Marcory',
  role: 'ADMIN',
  isPremium: true,
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user] = useState<User>(MOCK_USER);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'community': return <Community />;
      case 'shop': return <Shop />;
      case 'chat': return <Chat />;
      case 'profile': return <Profile />;
      case 'ai': return <AIEditor />;
      case 'admin': return <Admin />;
      default: return <Home />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isAdmin={user.role === 'ADMIN' || user.role === 'PRESIDENT'}
    >
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;

// Custom Animations via Tailwind classes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
  .animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
`;
document.head.appendChild(style);
