import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTelegram } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: ${props => props.isExpanded ? '280px' : '60px'};
  transition: width 0.3s ease;
  height: 100%;
  background-color: #2c3e50;
  color: #ecf0f1;
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #34495e;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: ${props => props.isExpanded ? 'space-between' : 'center'};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  display: ${props => props.isExpanded ? 'block' : 'none'};
`;

const AppsContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AppButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #34495e;
  }
`;

const AppIcon = styled.div`
  font-size: 24px;
  min-width: 24px;
  display: flex;
  justify-content: center;
`;

const AppName = styled.span`
  margin-left: 15px;
  white-space: nowrap;
  opacity: ${props => props.isExpanded ? 1 : 0};
  transition: opacity 0.2s ease;
`;

export default function AppSidebar({ onAppSelect }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SidebarContainer 
      isExpanded={isExpanded}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarHeader isExpanded={isExpanded}>
        <Title isExpanded={isExpanded}>BirdUcc</Title>
      </SidebarHeader>
      <AppsContainer>
        <AppButton onClick={() => onAppSelect('telegram')}>
          <AppIcon>
            <FaTelegram />
          </AppIcon>
          <AppName isExpanded={isExpanded}>Telegram</AppName>
        </AppButton>
      </AppsContainer>
    </SidebarContainer>
  );
}