import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, BookOpen, User, RotateCcw, AlertTriangle } from 'lucide-react';
import { Message, MessageRole } from '../types';
import { sendMessageToRAG } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: MessageRole.SYSTEM,
      text: 'Hello. I am the TelcoNexus RAG Assistant. I have access to internal runbooks, network architecture diagrams, and active incident reports. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToRAG(userMsg.text, messages);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: response.text,
        timestamp: new Date(),
        retrievedContext: response.retrievedDocs
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="font-semibold text-slate-100 flex items-center gap-2">
              <Cpu size={18} className="text-cyan-400" />
              RAG Agent: Network Ops
            </h2>
            <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">gemini-2.5-flash</span>
          </div>
          <button 
            onClick={handleReset}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700"
            title="Reset Session"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] lg:max-w-[75%] flex gap-3 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === MessageRole.USER ? 'bg-indigo-600' : 'bg-cyan-600'
                }`}>
                  {msg.role === MessageRole.USER ? <User size={14} /> : <Cpu size={14} />}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-2">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                    msg.role === MessageRole.USER 
                      ? 'bg-indigo-600/90 text-white rounded-tr-none' 
                      : 'bg-slate-800/90 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Retrieved Context Preview (Only for Model) */}
                  {msg.retrievedContext && msg.retrievedContext.length > 0 && (
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/60 text-xs">
                      <div className="flex items-center gap-2 text-slate-400 mb-2 font-mono uppercase tracking-wider">
                        <BookOpen size={12} />
                        <span>Sources Retrieved</span>
                      </div>
                      <div className="space-y-2">
                        {msg.retrievedContext.map((doc) => (
                          <div key={doc.id} className="flex flex-col gap-1 pl-2 border-l-2 border-cyan-500/30">
                            <span className="text-cyan-400 font-medium truncate">{doc.source}</span>
                            <span className="text-slate-500 truncate">{doc.content.substring(0, 80)}...</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] flex gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Cpu size={14} />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-800/50 border-t border-slate-700">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a use case, system status, or runbook procedure..."
              className="w-full bg-slate-900 text-slate-100 rounded-xl pl-4 pr-12 py-3 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none h-14 scrollbar-hide text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500 justify-center">
            <AlertTriangle size={10} />
            <span>AI responses should be verified with official runbooks before execution in production environments.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;