import React from 'react';
import styled from 'styled-components';

const TelegramContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #f5f6f8;
`;

const OpenButton = styled.button`
  padding: 12px 24px;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0077b3;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  max-width: 400px;
  line-height: 1.5;
`;

const TelegramWeb = () => {
  const handleOpenTelegram = () => {
    window.open('https://web.telegram.org/k/', '_blank');
  };

  return (
    <TelegramContainer>
      <Description>
        Click the button below to open Telegram Web in a new window. This is required for security reasons.
      </Description>
      <OpenButton onClick={handleOpenTelegram}>
        Open Telegram Web
      </OpenButton>
    </TelegramContainer>
  );
};

export default TelegramWeb; 