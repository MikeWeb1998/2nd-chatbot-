export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  content: string;
  createdAt: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  knowledgeBases: KnowledgeBase[];
  selectedKnowledgeBase: string | null;
  apiKey: string;
}