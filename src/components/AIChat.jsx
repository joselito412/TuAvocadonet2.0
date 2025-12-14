import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { queryLegalAssistant } from '../services/ragService';
import { sanitizeHTML } from '../utils/security';
import { analytics } from '../utils/analytics';

const AIChat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasMounted = useRef(false);
  const hasUserInteracted = useRef(false);

  // Initialize greeting (only once or when empty)
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: t('aiChat.greeting'),
          sender: 'bot',
        },
      ]);
    }
  }, [t, messages.length]);
  // If language changes and chat is empty (or just mounted), it sets greeting.
  // If user has history, we preserve it (standard chat behavior).

  const scrollToBottom = () => {
    // Only scroll if user has interacted or messages have been added
    if (hasUserInteracted.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Skip scroll on initial mount
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    // Only scroll if user has sent a message
    if (hasUserInteracted.current) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    // Mark that user has interacted
    hasUserInteracted.current = true;

    analytics.trackAction('chat_message_sent', { messageType: 'user' });

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await queryLegalAssistant(text);
      const botMsg = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
      analytics.trackAction('chat_response_received', { success: true });
    } catch (error) {
      console.error('Error querying AI:', error);
      analytics.trackError(error, { context: 'AI Chat' });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: t('aiChat.errorGeneric'),
          sender: 'bot',
        },
      ]);
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
          <h4 style={{ margin: 0, color: 'var(--color-dark)' }}>{t('aiChat.title')}</h4>
          <span style={{ fontSize: '0.8rem', color: '#2E7D32' }}>● {t('aiChat.status')}</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender}`}
            dangerouslySetInnerHTML={renderMessage(msg.text)}
          ></div>
        ))}
        {isLoading && (
          <div className="message bot">
            <i className="fas fa-circle-notch fa-spin"></i> {t('aiChat.analyzing')}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="suggestion-chips">
          <div className="chip" onClick={() => handleSend(t('aiChat.chipsQueries.contract'))}>
            {t('aiChat.chips.contract')}
          </div>
          <div className="chip" onClick={() => handleSend(t('aiChat.chipsQueries.petition'))}>
            {t('aiChat.chips.petition')}
          </div>
          <div className="chip" onClick={() => handleSend(t('aiChat.chipsQueries.fine'))}>
            {t('aiChat.chips.fine')}
          </div>
        </div>
        <div className="input-wrapper" style={{ marginTop: '15px' }}>
          <input
            type="text"
            className="chat-input"
            placeholder={t('aiChat.placeholder')}
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
