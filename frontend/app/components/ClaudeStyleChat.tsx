'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import MarkdownRenderer from './MarkdownRenderer';
import { queryKnowledgeBase, initKnowledgeBase } from '@/lib/utils/knowledge-base';
import { Button } from '@/components/ui/button';
import { HomeIcon, MessageSquare, HelpCircle, Search, ChevronRight, Check } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type ActiveTab = 'home' | 'messages' | 'help';

interface HelpArticle {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface HelpCollection {
  id: number;
  title: string;
  articleCount: number;
  articles: HelpArticle[];
}

export default function ClaudeStyleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKnowledgeBaseReady, setIsKnowledgeBaseReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [collections, setCollections] = useState<HelpCollection[]>([
    { 
      id: 1, 
      title: 'Pension Schemes', 
      articleCount: 3,
      articles: [
        { 
          id: 101, 
          title: 'Understanding Tier 2 Pension', 
          content: 'Tier 2 is a mandatory occupational pension scheme managed by approved Trustees. It provides lump sum benefits upon retirement and is funded by 5% of your salary, contributed by your employer.', 
          category: 'Pension Schemes' 
        },
        { 
          id: 102, 
          title: 'Personal Pension Plans', 
          content: 'Personal pension plans (Tier 3) allow you to make additional voluntary contributions toward your retirement. These plans offer tax benefits and flexibility in contribution amounts.', 
          category: 'Pension Schemes' 
        },
        { 
          id: 103, 
          title: 'Provident Fund Scheme', 
          content: 'The Provident Fund Scheme is a voluntary savings program that helps you build additional retirement funds. Contributions are flexible and can be adjusted based on your financial situation.', 
          category: 'Pension Schemes' 
        }
      ]
    },
    { 
      id: 2, 
      title: 'Enrollment Process', 
      articleCount: 2,
      articles: [
        { 
          id: 201, 
          title: 'How to Enroll as an Individual', 
          content: 'To enroll as an individual, complete the Personal Pension Enrollment Form available in our Self-Service Center. Submit the form with your ID and proof of income to start your pension journey.', 
          category: 'Enrollment Process' 
        },
        { 
          id: 202, 
          title: 'Employer Enrollment Guide', 
          content: 'Employers can enroll their staff by submitting the Employer Enrollment Form along with employee details. Our team will set up the accounts and provide access credentials for all employees.', 
          category: 'Enrollment Process' 
        }
      ]
    },
    { 
      id: 3, 
      title: 'Benefit Claims', 
      articleCount: 3,
      articles: [
        { 
          id: 301, 
          title: 'Retirement Benefit Claims', 
          content: 'Upon reaching retirement age, you can claim your benefits by submitting the Retirement Benefit Claim Form with supporting documents including proof of age and employment history.', 
          category: 'Benefit Claims' 
        },
        { 
          id: 302, 
          title: 'Beneficiary Claims Process', 
          content: 'Beneficiaries can claim benefits by submitting the Beneficiary Claim Form along with the death certificate and proof of relationship to the deceased member.', 
          category: 'Benefit Claims' 
        },
        { 
          id: 303, 
          title: 'Early Withdrawal Conditions', 
          content: 'Early withdrawals are permitted under specific conditions such as critical illness or permanent disability. Documentation from medical professionals is required for such claims.', 
          category: 'Benefit Claims' 
        }
      ]
    },
    { 
      id: 4, 
      title: 'Personal Pension', 
      articleCount: 2,
      articles: [
        { 
          id: 401, 
          title: 'Tax Benefits of Personal Pension', 
          content: 'Personal pension contributions qualify for tax relief up to 16.5% of your income. This can significantly reduce your annual tax burden while building your retirement savings.', 
          category: 'Personal Pension' 
        },
        { 
          id: 402, 
          title: 'Investment Options', 
          content: 'Our personal pension plans offer various investment options ranging from conservative to aggressive growth strategies. You can choose based on your risk tolerance and retirement timeline.', 
          category: 'Personal Pension' 
        }
      ]
    },
    { 
      id: 5, 
      title: 'FAQ', 
      articleCount: 4,
      articles: [
        { 
          id: 501, 
          title: 'How do I claim my Tier 2 benefits?', 
          content: 'To claim your Tier 2 benefits, download and complete the Tier 2 Benefit Claim Form from our Self-Service Centre. Submit the form along with required documents including proof of retirement age and employment history.', 
          category: 'FAQ' 
        },
        { 
          id: 502, 
          title: 'Can I contribute to both Tier 2 and Tier 3?', 
          content: 'Yes, you can contribute to both Tier 2 and Tier 3 schemes simultaneously. Tier 2 is mandatory through your employer, while Tier 3 offers additional voluntary contributions.', 
          category: 'FAQ' 
        },
        { 
          id: 503, 
          title: 'How do I check my pension balance online?', 
          content: 'Log in to the Member Portal using your PAN and password. Your current balance and contribution history will be displayed on your dashboard.', 
          category: 'FAQ' 
        },
        { 
          id: 504, 
          title: 'Who qualifies for the Account Booster program?', 
          content: 'The Account Booster program is available to all Tier 3 contributors who maintain regular monthly contributions for at least 6 months.', 
          category: 'FAQ' 
        }
      ]
    },
  ]);
  const [showChatView, setShowChatView] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<HelpCollection | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [searchResults, setSearchResults] = useState<HelpArticle[]>([]);
  const [lastMessage, setLastMessage] = useState<string>('No recent messages');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Save last message when messages are updated
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant') {
        // Save a preview of the last message (first 50 characters)
        setLastMessage(lastMsg.content.substring(0, 50) + (lastMsg.content.length > 50 ? '...' : ''));
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const height = container.clientHeight;
      const maxScrollTop = scrollHeight - height;
      container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;

      // Force browser to recalculate layout and scroll again after a small delay
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 50);
      
      // Ensure text is visible by scrolling one more time after rendering
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 300);
    }
  };

  useEffect(() => {
    // Scroll immediately and then again after a delay to handle content rendering
    scrollToBottom();
    
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    // Try one more time after longer delay to ensure all content is rendered
    const finalTimeoutId = setTimeout(() => {
      scrollToBottom();
    }, 500);
    
    // One last attempt for very long content
    const lastAttemptId = setTimeout(() => {
      scrollToBottom();
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(finalTimeoutId);
      clearTimeout(lastAttemptId);
    };
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
      let fullResponse = '';

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
              const content = parsed.choices?.[0]?.delta?.content || '';
              
              if (content) {
                accumulatedResponse += content;
                fullResponse += content;
                setStreamedResponse(accumulatedResponse);
                
                // Ensure scrolling happens as content arrives
                setTimeout(() => {
                  scrollToBottom();
                }, 50);
              }
            } catch (error) {
              console.error('Error parsing streaming response:', error);
            }
          }
        }
      }

      // Add the complete final response
      if (fullResponse) {
        setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
      }
      
      setStreamedResponse('');
    } catch (error) {
      console.error('Error in chat request:', error);
      setMessages(prev => [
        ...prev.filter(msg => msg.content !== 'Searching for information...'),
        { role: 'assistant', content: 'Sorry, I encountered an error while processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
      setStreamedResponse('');
      
      // Ensure one final scroll after everything is done
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setStreamedResponse('');
    setShowChatView(true);
    setActiveTab('messages');
  };

  const handleSearchHelpCenter = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = inputRef.current?.value.toLowerCase();
    console.log('Search query:', searchQuery);
    
    if (!searchQuery) {
      // If search is empty, show collections
      setSearchResults([]);
      return;
    }
    
    // Search across all articles in all collections
    const results: HelpArticle[] = [];
    collections.forEach(collection => {
      collection.articles.forEach(article => {
        if (
          article.title.toLowerCase().includes(searchQuery) || 
          article.content.toLowerCase().includes(searchQuery)
        ) {
          results.push(article);
        }
      });
    });
    
    console.log('Search results:', results.length, 'matches found');
    setSearchResults(results);
    setSelectedCollection(null);
    setSelectedArticle(null);
  };
  
  // Handle input changes for auto-search
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    
    // Only search if at least 2 characters are typed
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    
    // Search across all articles in all collections
    const results: HelpArticle[] = [];
    collections.forEach(collection => {
      collection.articles.forEach(article => {
        if (
          article.title.toLowerCase().includes(searchQuery) || 
          article.content.toLowerCase().includes(searchQuery)
        ) {
          results.push(article);
        }
      });
    });
    
    setSearchResults(results);
    setSelectedCollection(null);
    setSelectedArticle(null);
  };
  
  const handleSelectCollection = (collection: HelpCollection) => {
    setSelectedCollection(collection);
    setSelectedArticle(null);
    setSearchResults([]);
  };
  
  const handleSelectArticle = (article: HelpArticle) => {
    setSelectedArticle(article);
  };
  
  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setSelectedArticle(null);
    setSearchResults([]);
  };
  
  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };
  
  const handleUseArticleInChat = (article: HelpArticle) => {
    setActiveTab('messages');
    setShowChatView(true);
    setInput(`Tell me more about: ${article.title}`);
    // Focus on the textarea after a brief delay to ensure it's rendered
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background rounded-xl shadow-md border">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-2 bg-primary/10 shrink-0">
        <div className="bg-primary/20 p-2 rounded-lg">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground">SPT Assistant</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Need support?</h3>
              <h2 className="font-semibold text-2xl mb-4">How can we help?</h2>
            </div>
            
            {/* Recent message */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Recent message</p>
              <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
                   onClick={() => {
                     setActiveTab('messages');
                     setShowChatView(true);
                   }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">SPT Assistant</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {messages.length > 0 ? lastMessage : "Click to start chatting"}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            
            {/* Shortcuts */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="outline" 
                className="h-auto py-3 justify-start" 
                onClick={() => setActiveTab('messages')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-3 justify-start" 
                onClick={() => setActiveTab('help')}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </div>
            
            {/* Status */}
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <p className="font-medium">Status: All Systems Operational</p>
              </div>
              <p className="text-sm text-muted-foreground">Updated {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="flex-1 flex flex-col">
            {messages.length === 0 && !showChatView ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-md">
                  <h3 className="font-semibold text-lg mb-2">Messages</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation with SPT Assistant to get help with your pension questions.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={startNewChat}>
                    Send us a message <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat messages */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-auto"
                  style={{ 
                    height: "calc(100vh - 280px)",
                    maxHeight: "calc(100% - 140px)",
                    minHeight: "300px", 
                    position: "relative"
                  }}
                >
                  <div className="px-4 pt-4 pb-20 absolute inset-0 overflow-y-auto">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        } mb-4`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted border text-foreground'
                          } ${message.content === 'Searching for information...' ? 'animate-pulse' : ''}`}
                          style={{ 
                            overflowWrap: 'break-word', 
                            wordBreak: 'break-word',
                            maxHeight: 'none'
                          }}
                        >
                          {message.role === 'assistant' ? (
                            <div className="whitespace-normal overflow-visible">
                              <MarkdownRenderer 
                                content={message.content} 
                                className="text-sm leading-normal" 
                              />
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Streaming response */}
                    {streamedResponse && (
                      <div className="flex justify-start mb-4">
                        <div 
                          className="max-w-[85%] rounded-lg p-4 bg-muted border text-foreground"
                          style={{ 
                            overflowWrap: 'break-word', 
                            wordBreak: 'break-word',
                            maxHeight: 'none'
                          }}
                        >
                          <div className="whitespace-normal overflow-visible">
                            <MarkdownRenderer 
                              content={streamedResponse} 
                              className="text-sm leading-normal" 
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isLoading && !streamedResponse && !isSearching && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-muted border rounded-lg p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} className="h-px" />
                  </div>
                </div>

                {/* Chat input */}
                <div className="p-5 border-t shrink-0">
                  <form onSubmit={handleSubmit} className="flex items-end gap-3">
                    <div className="flex-1 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary shadow-sm">
                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about pensions, benefits, or our services..."
                        className="w-full p-4 focus:outline-none resize-none min-h-[60px] max-h-[150px] bg-background text-base"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-md"
                      disabled={isLoading || !input.trim()}>
                      <PaperPlaneIcon className="h-5 w-5" />
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2 ml-1">Press Enter to send, Shift+Enter for a new line</p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'help' && (
          <div className="flex-1 overflow-y-auto">
            {/* Search bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for help (type to find articles)"
                  className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            
            {/* Collections View */}
            {!selectedCollection && searchResults.length === 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">{collections.length} collections</h3>
                
                <div className="space-y-2">
                  {collections.map(collection => (
                    <div 
                      key={collection.id} 
                      className="border rounded-lg cursor-pointer hover:bg-muted/40"
                      onClick={() => handleSelectCollection(collection)}
                    >
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">{collection.title}</h4>
                          <p className="text-sm text-muted-foreground">{collection.articleCount} articles</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Results View */}
            {searchResults.length > 0 && !selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2"
                    onClick={handleBackToCollections}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back
                  </Button>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {searchResults.length} results
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {searchResults.map(article => (
                    <div 
                      key={article.id} 
                      className="border rounded-lg cursor-pointer hover:bg-muted/40"
                      onClick={() => handleSelectArticle(article)}
                    >
                      <div className="p-4">
                        <h4 className="font-medium">{article.title}</h4>
                        <p className="text-sm text-muted-foreground">{article.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Articles View */}
            {selectedCollection && !selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2"
                    onClick={handleBackToCollections}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back
                  </Button>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {selectedCollection.title} ({selectedCollection.articles.length} articles)
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {selectedCollection.articles.map(article => (
                    <div 
                      key={article.id} 
                      className="border rounded-lg cursor-pointer hover:bg-muted/40"
                      onClick={() => handleSelectArticle(article)}
                    >
                      <div className="p-4">
                        <h4 className="font-medium">{article.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Article Detail View */}
            {selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2"
                    onClick={handleBackToArticles}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back
                  </Button>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {selectedArticle.category}
                  </h3>
                </div>
                
                <div className="border rounded-lg p-4 mb-4">
                  <h2 className="text-lg font-semibold mb-3">{selectedArticle.title}</h2>
                  <p className="mb-4">{selectedArticle.content}</p>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleUseArticleInChat(selectedArticle)}
                  >
                    Ask more about this topic
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium mb-2">Was this helpful?</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Yes</Button>
                    <Button variant="outline" size="sm">No</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="border-t grid grid-cols-3 divide-x shrink-0">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-3 ${
            activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <HomeIcon className="h-5 w-5 mb-1" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center justify-center py-3 ${
            activeTab === 'messages' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-xs">Messages</span>
        </button>
        <button
          onClick={() => setActiveTab('help')}
          className={`flex flex-col items-center justify-center py-3 ${
            activeTab === 'help' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <HelpCircle className="h-5 w-5 mb-1" />
          <span className="text-xs">Help</span>
        </button>
      </div>
    </div>
  );
}

