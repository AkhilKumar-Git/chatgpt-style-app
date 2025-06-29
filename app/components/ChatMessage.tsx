'use client';

import { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
} 