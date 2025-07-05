'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Message } from './types';

interface UserPreferences {
  tone?: string;
  length?: string;
  examples?: string;
  language?: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // IMPORTANT: Set your OpenAI API key in a .env file as NEXT_PUBLIC_OPENAI_API_KEY
    // For security, in production you should call OpenAI from a backend, not directly from the client.
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return 'OpenAI API key is not set. Please set NEXT_PUBLIC_OPENAI_API_KEY in your .env file.';
    }
    try {
      // Prepare the last 5 messages as context, mapped to OpenAI's format
      const contextMessages = messages.slice(-5).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      // Add user preferences as a system message
      let systemContent = "You are a helpful assistant.";
      if (preferences) {
        systemContent += `\nUser preferences: Tone: ${preferences.tone || 'N/A'}, Length: ${preferences.length || 'N/A'}, Examples: ${preferences.examples || 'N/A'}, Language: ${preferences.language || 'N/A'}`;
      }
      const openaiMessages = [
        { role: 'system', content: systemContent },
        ...contextMessages,
        { role: 'user', content: userMessage },
      ];
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: openaiMessages,
          max_tokens: 256,
        }),
      });
      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || 'No response from OpenAI.';
    } catch (err: any) {
      console.error('OpenAI API error:', err);
      return 'Sorry, I could not get a response from OpenAI.';
    }
  };

  // Add state for input value
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your message. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // New handler for button click
  const handleInputSend = () => {
    if (inputValue.trim() !== '') {
      handleSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ChatGPT Style App
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back!
            </span>
            <button
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-colors"
              onClick={() => router.push('/gallery')}
            >
              Go to Gallery
            </button>
            <a
              href="/login"
              className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 my-2 rounded-lg ${message.role === 'assistant' ? 'bg-green-100 dark:bg-green-900 text-black dark:text-white' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}>
              <div className="text-xs font-semibold mb-1">{message.role === 'assistant' ? 'Assistant' : 'You'}</div>
              <div>{message.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 p-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Assistant
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  Thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="max-w-4xl mx-auto w-full p-4 flex gap-2">
        <textarea
          className="flex-1 rounded border border-gray-300 dark:border-gray-700 p-2 resize-none bg-white dark:bg-gray-800 text-black dark:text-white"
          rows={2}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInputSend(); } }}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
          onClick={handleInputSend}
          disabled={isLoading || inputValue.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
} 