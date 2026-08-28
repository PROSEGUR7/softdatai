import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Sparkles } from 'lucide-react';
import Mascot from './Mascot';
import MascotHead from './MascotHead';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=' + API_KEY;

const SYSTEM_PROMPT = `Eres el asistente oficial de Softdatai, un chatbot alojado en softdatai.com. Tu única función es entregar información clara, precisa y profesional sobre la empresa, sus servicios, soluciones y stack tecnológico.

REGLAS ESTRICTAS (cumplir siempre, sin excepción):

1. SALUDO ÚNICO: Saluda SOLO en el primer turno de la conversación (cuando no hay mensajes previos del usuario). A partir del segundo turno en adelante, JAMÁS vuelvas a saludar. NO escribas "Hola", "Buenos días", "Qué gusto saludarte", "Un placer" ni variantes al inicio de respuestas en turnos 2+.

2. SIN PREGUNTAS DE CIERRE: Jamás cierres con preguntas. PROHIBIDO usar "¿En qué más te puedo ayudar?", "¿Te gustaría saber más?", "¿Tienes alguna duda?", "¿Cuál de estas áreas podemos ayudarte hoy?", "¿Cómo podemos asistirte?" o cualquier pregunta al final. Termina la respuesta inmediatamente después de entregar la información.

3. NUNCA repitas la pregunta del usuario. Responde directamente.

4. NUNCA termines invitando a continuar la conversación. Solo entrega el dato solicitado y punto.

5. CEROS RELLENO: Sin rodeos, sin frases meta-conversacionales ("Con gusto", "Por supuesto", "Es un placer", "Con mucho gusto te ayudo"), sin formalidades innecesarias. Empieza la respuesta directamente con el contenido útil.

6. TONO: Profesional, técnico y cercano. Habla siempre en nombre de Softdatai.

Si dudas entre saludar o no saludar, NO saludes. Es preferible omitir el saludo a repetirlo.`;

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const FloatingMascot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 200); }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) { messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); }
  }, [isOpen, messages]);

  const callGeminiAPI = async (history: Message[], retries = 3): Promise<string> => {
    const contents = history.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }, generationConfig: { temperature: 0.3, maxOutputTokens: 300 } }),
        });
        
        if (res.ok) {
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No pude generar respuesta.';
        }
        
        if (res.status === 503 || res.status === 429) {
          await new Promise(r => setTimeout(r, 1000 * (i + 1)));
          continue;
        }
        
        if (res.status === 400) {
          return 'Solicitud incorrecta. Por favor intenta con otra pregunta.';
        }
        
        if (res.status === 403) {
          return 'Acceso denegado. Contacta al administrador.';
        }
        
        return 'Error del servidor (' + res.status + '). Intenta de nuevo.';
      } catch (err) {
        if (i === retries - 1) {
          return 'Lo siento, tengo problemas de conexion. Verifica tu internet e intenta de nuevo.';
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    return 'El servicio esta temporalmente no disponible. Intenta en unos minutos.';
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    const nextHistory: Message[] = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsLoading(true);
    const aiRes = await callGeminiAPI(nextHistory);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: aiRes }]);
    setIsLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={`fixed z-50 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 hover:scale-110'}`} style={{ bottom: '20px', right: '20px' }} aria-label="Abrir chat">
        <Mascot size={120} animationSpeed={200} />
      </button>
      {isOpen && (
        <div className="fixed z-50 w-[90%] sm:w-96" style={{ bottom: '20px', right: '20px' }}>
          <div className="bg-neutral-900/98 backdrop-blur-xl rounded-2xl border border-neutral-700/50 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-neutral-700/50">
              <div className="flex items-center gap-3">
                <MascotHead size={48} animationSpeed={180} zoom={0.4} borderRadius={0} />
                <div><h3 className="text-white font-semibold text-sm">Asistente Softdatai</h3><p className="text-neutral-400 text-xs">IA - En linea</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700/50 rounded-lg transition-colors"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto p-3 space-y-3 h-64">
              {messages.length === 0 && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles size={12} />
                  </div>
                  <p className="text-neutral-200 text-xs">Preguntame acerca de Softdatai</p>
                </div>
              )}
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>{m.role === 'user' ? <User size={14} /> : <Bot size={14} />}</div>
                    <div className={`px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-accent/20 text-white rounded-tr-md' : 'bg-neutral-800/80 text-neutral-200 rounded-tl-md'}`}>{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex items-center gap-2 text-neutral-400 text-sm"><Loader2 size={14} className="animate-spin" /><span>Escribiendo...</span></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-neutral-700/50 bg-neutral-900/50">
              <div className="flex items-center gap-2 bg-neutral-800/80 rounded-xl px-3 py-2">
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Escribe tu mensaje..." disabled={isLoading} className="flex-1 bg-transparent text-white placeholder-neutral-500 outline-none text-sm" />
                <button onClick={handleSend} disabled={!input.trim() || isLoading} className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 disabled:opacity-50 transition-colors"><Send size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingMascot;