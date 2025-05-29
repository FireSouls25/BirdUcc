import React, { useState, useEffect } from 'react';
import TelegramWebApp from '@twa-dev/sdk';
import './TelegramIntegration.css';

// Extender la interfaz Window para incluir Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  chatId: string;
  userId: string;
}

const TelegramIntegration: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);

  useEffect(() => {
    // Verificar si estamos en el contexto de Telegram Web App
    const isTelegram = window.Telegram?.WebApp !== undefined;
    setIsTelegramWebApp(isTelegram);

    if (isTelegram) {
      try {
        // Inicializar la Web App de Telegram
        TelegramWebApp.ready();
        TelegramWebApp.expand();
        
        // Obtener el ID del usuario de Telegram
        const tgUser = TelegramWebApp.initDataUnsafe?.user;
        if (tgUser?.id) {
          setUserId(tgUser.id.toString());
          setIsConnected(true);
          fetchMessages(tgUser.id.toString());
        }
      } catch (error) {
        console.error('Error initializing Telegram Web App:', error);
      }
    }
  }, []);

  const fetchMessages = async (uid: string) => {
    try {
      const response = await fetch(`http://localhost:8081/api/telegram/messages/${uid}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    try {
      const response = await fetch('http://localhost:8081/api/telegram/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newMessage,
          userId: userId,
          chatId: isTelegramWebApp ? TelegramWebApp.initDataUnsafe?.chat?.id.toString() : userId
        }),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="telegram-connect">
        <h2>Connect with Telegram</h2>
        {isTelegramWebApp ? (
          <p>Please wait while we connect to Telegram...</p>
        ) : (
          <div>
            <p>To use the chat, please open this page in Telegram:</p>
            <a 
              href="https://t.me/BIRDUCC_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
            >
              Open in Telegram
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="telegram-container">
      <div className="chat-header">
        <h2>Telegram Chat</h2>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === userId ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default TelegramIntegration; 