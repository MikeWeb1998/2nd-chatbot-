import React from 'react';
import { Brain } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ApiKeyInput } from './components/ApiKeyInput';
import { useChatStore } from './store/chat';

function App() {
  const { messages, isLoading } = useChatStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Brain className="text-blue-500" size={24} />
            <h1 className="text-xl font-semibold">AI Knowledge Assistant</h1>
          </div>
        </header>

        <ApiKeyInput />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          )}
        </div>

        <ChatInput />
      </div>
    </div>
  );
}

export default App;