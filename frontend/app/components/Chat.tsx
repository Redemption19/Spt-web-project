'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import MarkdownRenderer from './MarkdownRenderer';
import { queryKnowledgeBase, initKnowledgeBase } from '@/lib/utils/knowledge-base';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKnowledgeBaseReady, setIsKnowledgeBaseReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize knowledge base on component mount
  useEffect(() => {
    const init = async () => {
      try {
        await initKnowledgeBase();
        setIsKnowledgeBaseReady(true);
      } catch (error) {
        console.error('Error initializing knowledge base:', error);
      }
    };
    
    init();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamedResponse('');
    
    // Add a temporary "thinking" message
    setMessages(prev => [
      ...prev, 
      { 
        role: 'assistant', 
        content: 'Searching for information...' 
      }
    ]);

    try {
      // Get relevant context from knowledge base
      setIsSearching(true);
      const relevantInfo = isKnowledgeBaseReady 
        ? await queryKnowledgeBase(input, 3)
        : [];
      setIsSearching(false);
      
      // Remove the temporary thinking message
      setMessages(prev => prev.slice(0, prev.length - 1));
      
      // Construct context message if we have relevant info
      let contextMessages: Message[] = [];
      if (relevantInfo.length > 0) {
        // Get the base URL safely (works in both browser and server environments)
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : 'https://standardpensiontrust.com';
          
        const contextContent = `
Here is relevant information from the SPT Pension Trust website:

${relevantInfo.map(item => `[PAGE: ${item.route}](${baseUrl}${item.route})
${item.content}
`).join('\n---\n')}

Please use the above information to provide an accurate and specific answer. When referencing specific schemes or pages, use proper markdown links like [Page Name](${baseUrl}/path) instead of just showing the path.`;

        contextMessages.push({
          role: 'system',
          content: contextContent
        });
      }

      // Prepare message array for the API
      const messageArray = [
        ...contextMessages,
        ...messages.filter(msg => msg.role !== 'assistant' || msg.content !== 'Searching for information...'), 
        userMessage
      ];

      // Start streaming response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messageArray,
          stream: true
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Set up streaming response handling
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      // Start streaming UI
      let accumulatedResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // Decode and process the chunk
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices && parsed.choices[0].delta?.content) {
                accumulatedResponse += parsed.choices[0].delta.content;
                setStreamedResponse(accumulatedResponse);
              }
            } catch (e) {
              console.error('Error parsing stream data:', e);
            }
          }
        }
      }

      // Add the final response to messages
      if (accumulatedResponse) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: accumulatedResponse,
          },
        ]);
        setStreamedResponse('');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Remove the temporary thinking message and add the error message
      setMessages(prev => [
        ...prev.filter(msg => msg.role !== 'assistant' || msg.content !== 'Searching for information...'),
        {
          role: 'assistant',
          content: `Error: ${errorMessage}. Please check the browser console for more details.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100'
              } ${message.content === 'Searching for information...' ? 'animate-pulse' : ''}`}
            >
              {message.role === 'assistant' ? (
                <MarkdownRenderer content={message.content} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        
        {/* Streaming response */}
        {streamedResponse && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100">
              <MarkdownRenderer content={streamedResponse} />
            </div>
          </div>
        )}
        
        {isLoading && !streamedResponse && !isSearching && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-neutral-800 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-neutral-700">
        <div className="flex space-x-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white text-sm resize-none overflow-hidden min-h-[44px] max-h-[200px]"
              disabled={isLoading}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed h-[44px] flex-shrink-0"
          >
            <PaperPlaneIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
} 