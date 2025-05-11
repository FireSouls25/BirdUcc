import { useState, useEffect } from 'react';

const initialMessages = [
  { id: 1, sender: 'Juan Pérez', text: '¡Hola!' },
  { id: 2, sender: 'Yo', text: '¿Cómo estás?' },
];

export default function useChatMessages() {
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'Yo',
      text,
    };
    setMessages([...messages, newMessage]);
  };

  return { messages, sendMessage };
}
