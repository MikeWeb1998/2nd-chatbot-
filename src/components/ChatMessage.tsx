import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg',
        isBot ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};