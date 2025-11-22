import React, { useState, useRef, useEffect } from 'react';
import { queryLegalAssistant } from '../services/ragService';
import { sanitizeHTML } from '../utils/security';
import { analytics } from '../utils/analytics';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola, soy tu asistente legal de Avocado. 🥑\nPuedo ayudarte a entender documentos, redactar derechos de petición o guiarte en procesos legales.\n\n**¿En qué te puedo ayudar hoy?**", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasMounted = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll after the first mount to prevent auto-scroll on page load
    if (hasMounted.current) {
      scrollToBottom();
    } else {
      hasMounted.current = true;
    }
  }, [messages, isLoading]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    analytics.trackAction('chat_message_sent', { messageType: 'user' });

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await queryLegalAssistant(text);
      const botMsg = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      analytics.trackAction('chat_response_received', { success: true });
    } catch (error) {
      console.error("Error querying AI:", error);
      analytics.trackError(error, { context: 'AI Chat' });
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: error.message || "Lo siento, tuve un problema conectando con la base de datos legal.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Safe message rendering function
  const renderMessage = (text) => {
    const sanitized = sanitizeHTML(text.replace(/\n/g, '<br>'));
    return { __html: sanitized };
  };

  return (
    <div className="chat-interface-container">
      <div className="chat-header">
        <div className="chat-avatar">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h4 style={{ margin: 0, color: 'var(--color-dark)' }}>Avocado AI</h4>
          <span style={{ fontSize: '0.8rem', color: '#2E7D32' }}>● En línea</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`} dangerouslySetInnerHTML={renderMessage(msg.text)}></div>
        ))}
        {isLoading && (
          <div className="message bot">
            <i className="fas fa-circle-notch fa-spin"></i> Analizando caso...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="suggestion-chips">
          <div className="chip" onClick={() => handleSend('Revisar contrato de arrendamiento')}>📄 Revisar contrato</div>
          <div className="chip" onClick={() => handleSend('Redactar derecho de petición')}>📝 Derecho de petición</div>
          <div className="chip" onClick={() => handleSend('Multa de tránsito injusta')}>👮 Multa de tránsito</div>
        </div>
        <div className="input-wrapper" style={{ marginTop: '15px' }}>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Escribe tu consulta legal aquí..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={1000}
          />
          <button className="send-btn" onClick={() => handleSend()} disabled={isLoading}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
