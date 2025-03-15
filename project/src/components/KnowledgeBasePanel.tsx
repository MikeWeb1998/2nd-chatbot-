import React, { useState } from 'react';
import { Plus, Book } from 'lucide-react';
import { useChatStore, addKnowledgeBase, selectKnowledgeBase } from '../store/chat';
import { cn } from '../lib/utils';

export const KnowledgeBasePanel: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newKbName, setNewKbName] = useState('');
  const [newKbContent, setNewKbContent] = useState('');
  
  const { knowledgeBases, selectedKnowledgeBase } = useChatStore();

  const handleAddKb = () => {
    if (!newKbName.trim() || !newKbContent.trim()) return;

    addKnowledgeBase({
      id: Date.now().toString(),
      name: newKbName,
      content: newKbContent,
      createdAt: Date.now(),
    });

    setIsAdding(false);
    setNewKbName('');
    setNewKbContent('');
  };

  return (
    <div className="w-64 border-r bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Knowledge Base</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={newKbName}
            onChange={(e) => setNewKbName(e.target.value)}
            placeholder="Knowledge base name"
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            value={newKbContent}
            onChange={(e) => setNewKbContent(e.target.value)}
            placeholder="enter content here  ."
            className="w-full px-3 py-2 border rounded h-32"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddKb}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {knowledgeBases.map((kb) => (
          <button
            key={kb.id}
            onClick={() => selectKnowledgeBase(kb.id)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded',
              selectedKnowledgeBase === kb.id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            )}
          >
            <Book size={16} />
            <span className="truncate">{kb.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};