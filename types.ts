
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skillsOffered: string[];
  skillsSought: string[];
  availableHours: number;
  points: number;
  rating: number;
  completedExchanges: number;
  location: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface ExchangeRequest {
  id: string;
  requesterId: string;
  providerId: string;
  skill: string;
  hours: number;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
}
