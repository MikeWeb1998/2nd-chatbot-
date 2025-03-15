import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { addMessage, setLoading, useChatStore } from '../store/chat';
import { getAIResponse } from '../lib/openrouter';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { knowledgeBases, selectedKnowledgeBase } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const selectedKB = knowledgeBases.find(kb => kb.id === selectedKnowledgeBase);
      const response = await getAIResponse(input, selectedKB?.content);
      
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Failed to get response:', error);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request. Please try again.',
        timestamp: Date.now(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Send size={20} />
      </button>
    </form>
  );
};