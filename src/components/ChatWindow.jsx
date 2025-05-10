import React, { useState } from 'react';
import styled from 'styled-components';
import useChatMessages from '../hooks/useChatMessages';

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #fafafa;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 16px;
  background-color: ${({ me }) => (me ? '#d1e7dd' : '#e9ecef')};
  align-self: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
`;

const InputContainer = styled.form`
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #dee2e6;
  background-color: #fff;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const SendButton = styled.button`
  margin-left: 8px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  background-color: #0d6efd;
  color: #fff;
  cursor: pointer;
`;

export default function ChatWindow() {
  const { messages, sendMessage } = useChatMessages();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText('');
  };

  return (
    <>
      <MessagesContainer>
        {messages.map(msg => (
          <MessageBubble key={msg.id} me={msg.sender === 'Yo'}>
            {msg.text}
          </MessageBubble>
        ))}
      </MessagesContainer>
      <InputContainer onSubmit={handleSubmit}>
        <TextInput
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <SendButton type="submit">Enviar</SendButton>
      </InputContainer>
    </>
  );
}