
export type Role = 'MEMBRE' | 'ADMIN' | 'PRESIDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  neighborhood: string;
  role: Role;
  isPremium: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

export interface Match {
  id: string;
  opponent: string;
  opponentLogo: string;
  date: string;
  time: string;
  competition: string;
  location: string;
  score?: { home: number; away: number };
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  attendees: string[];
  coords: { lat: number; lng: number };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  votedBy: string[];
}
