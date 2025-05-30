import React, { useState, useEffect, useRef } from 'react';
import { DoubleLinkedList } from './structures/DoubleLinkedList';
import { Queue } from './structures/Queue';
import { Tree } from './structures/Tree';
import { CircularDoublyLinkedList } from './structures/CircularDoublyLinkedList';
import { Graph } from './structures/Graph';
import { Stack } from './structures/Stack';
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
}

interface User {
  id: string;
  name: string;
  isActive: boolean;
}

interface NavigationNode {
  id: string;
  name: string;
  path: string;
}

interface ChatAction {
  type: 'send' | 'delete' | 'edit';
  message: Message;
  timestamp: Date;
}

const TelegramIntegration: React.FC = () => {
  const [messages, setMessages] = useState<DoubleLinkedList<Message>>(new DoubleLinkedList());
  const [newMessageQueue] = useState<Queue<Message>>(new Queue());
  const [navigationTree] = useState<Tree<NavigationNode>>(new Tree());
  const [activeUsers] = useState<CircularDoublyLinkedList<User>>(new CircularDoublyLinkedList());
  const [userConnections] = useState<Graph<User>>(new Graph());
  const [actionHistory] = useState<Stack<ChatAction>>(new Stack());
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar el árbol de navegación
    const root = navigationTree.setRoot({ id: 'root', name: 'Home', path: '/' });
    const chatNode = new TreeNode({ id: 'chat', name: 'Chat', path: '/chat' });
    const settingsNode = new TreeNode({ id: 'settings', name: 'Settings', path: '/settings' });
    root.addChild(chatNode);
    root.addChild(settingsNode);

    // Inicializar usuarios de ejemplo
    const users: User[] = [
      { id: '1', name: 'Usuario 1', isActive: true },
      { id: '2', name: 'Usuario 2', isActive: true },
      { id: '3', name: 'Usuario 3', isActive: false }
    ];

    users.forEach(user => {
      activeUsers.add(user);
      userConnections.addNode(user);
    });

    // Crear algunas conexiones entre usuarios
    userConnections.addEdge(users[0], users[1]);
    userConnections.addEdge(users[1], users[2]);

    // Simular conexión con Telegram
    const connectToTelegram = async () => {
      try {
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to Telegram:', error);
      }
    };

    connectToTelegram();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    // Agregar mensaje a la cola
    newMessageQueue.enqueue(newMessage);
    
    // Procesar mensaje de la cola
    const message = newMessageQueue.dequeue();
    if (message) {
      const updatedMessages = new DoubleLinkedList<Message>();
      messages.toArray().forEach(msg => updatedMessages.add(msg));
      updatedMessages.add(message);
      setMessages(updatedMessages);

      // Guardar acción en el historial
      actionHistory.push({
        type: 'send',
        message,
        timestamp: new Date()
      });
    }

    setInputMessage('');
  };

  const handleUndo = () => {
    const lastAction = actionHistory.pop();
    if (lastAction && lastAction.type === 'send') {
      const updatedMessages = new DoubleLinkedList<Message>();
      messages.toArray()
        .filter(msg => msg.id !== lastAction.message.id)
        .forEach(msg => updatedMessages.add(msg));
      setMessages(updatedMessages);
    }
  };

  return (
    <div className="telegram-container">
      <div className="chat-header">
        <h2>Telegram Chat</h2>
        <div className="active-users">
          {activeUsers.toArray().map(user => (
            <span key={user.id} className={`user ${user.isActive ? 'active' : ''}`}>
              {user.name}
            </span>
          ))}
        </div>
      </div>
      <div className="messages-container">
        {messages.toArray().map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {message.text}
              <span className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-form">
        <button
          className="undo-button"
          onClick={handleUndo}
          disabled={actionHistory.isEmpty()}
        >
          Deshacer
        </button>
        <input
          type="text"
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={!isConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TelegramIntegration; 