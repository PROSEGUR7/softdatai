import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2 } from 'lucide-react';
import Mascot from './Mascot';

const API_KEY = 'AIzaSyDpZNr8t7h3mNY4v6fJhzVW0WzbyJl_WzM';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `Eres el asistente virtual de SOFTDATAI. Solo responde sobre servicios de migración a la nube, IA, desarrollo de software, análisis de datos y transformación digital. Sé amigable y responde en español.`;

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', content: '¡Hola! 👋 Soy el asistente de SOFTDATAI. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const callGeminiAPI = async (text: string): Promise<string> => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      });
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar respuesta.';
    } catch { return 'Lo siento, tengo problemas. Intenta de nuevo.'; }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput(''); setIsLoading(true);
    const aiRes = await callGeminiAPI(userMsg.content);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: aiRes }]);
    setIsLoading(false); inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 w-full max-w-6xl mx-auto">
      <div className="flex-shrink-0 hidden lg:block"><Mascot size={150} animationSpeed={200} /></div>
      <div className={`bg-background-dark/95 backdrop-blur-md rounded-2xl border border-neutral-700/50 shadow-2xl w-full ${isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"><Bot className="text-primary" size={20} /></div>
            <div><h3 className="text-white font-medium">Asistente Softdatai</h3><p className="text-neutral-400 text-xs">IA • Siempre disponible</p></div>
          </div>
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-lg">{isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}</button>
        </div>
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)]">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                      {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${m.role === 'user' ? 'bg-accent/20 rounded-tr-md' : 'bg-neutral-800/80 rounded-tl-md'}`}>
                      <p className="text-sm text-neutral-200">{m.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex items-center gap-2 text-neutral-400"><Loader2 size={16} className="animate-spin" /><span>Escribiendo...</span></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-neutral-700/50">
              <div className="flex items-center gap-2 bg-neutral-800/50 rounded-xl px-4 py-2">
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Escribe tu pregunta..." disabled={isLoading} className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-sm" />
                <button onClick={handleSend} disabled={!input.trim() || isLoading} className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 disabled:opacity-50"><Send size={18} /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;
