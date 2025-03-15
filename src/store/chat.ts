import { create } from 'zustand';
import { ChatState, Message, KnowledgeBase } from '../types';

const getStoredApiKey = () => localStorage.getItem('openrouter_api_key') || '';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  knowledgeBases: [],
  selectedKnowledgeBase: null,
  apiKey: getStoredApiKey(),
}));

export const addMessage = (message: Message) => {
  useChatStore.setState((state) => ({
    messages: [...state.messages, message],
  }));
};

export const setLoading = (isLoading: boolean) => {
  useChatStore.setState({ isLoading });
};

export const addKnowledgeBase = (kb: KnowledgeBase) => {
  useChatStore.setState((state) => ({
    knowledgeBases: [...state.knowledgeBases, kb],
  }));
};

export const selectKnowledgeBase = (id: string) => {
  useChatStore.setState({ selectedKnowledgeBase: id });
};

export const setApiKey = (apiKey: string) => {
  localStorage.setItem('openrouter_api_key', apiKey);
  useChatStore.setState({ apiKey });
};