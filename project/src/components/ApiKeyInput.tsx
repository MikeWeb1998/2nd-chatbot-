import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useChatStore, setApiKey } from '../store/chat';

export const ApiKeyInput: React.FC = () => {
  const { apiKey } = useChatStore();
  const [isEditing, setIsEditing] = useState(!apiKey);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="border-b bg-white px-6 py-3">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Enter your OpenRouter API key"
            className="flex-1 px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Key size={16} />
            <span>API Key: {apiKey.slice(0, 8)}...</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};