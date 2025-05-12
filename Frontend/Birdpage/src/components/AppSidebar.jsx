import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTelegram } from 'react-icons/fa';
import birduccLogo from '../assets/birducc_logo.png';
import uccLogo from '../assets/ucc_logo.png';

const SidebarContainer = styled.div`
  width: ${props => props.isExpanded ? '280px' : '60px'};
  transition: width 0.3s ease;
  height: 100%;
  background-color: #2c3e50;
  color: #ecf0f1;
  position: relative;
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

const LogoImg = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
  margin-left: 10px;
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

const BottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2c3e50;
  border-top: 1px solid #34495e;
`;

const UccLogoImg = styled.img`
  height: 36px;
  width: 36px;
  object-fit: contain;
  margin-right: 10px;
`;

const UccText = styled.span`
  color: #ecf0f1;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
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
        <LogoImg src={birduccLogo} alt="BirdUcc Logo" isExpanded={isExpanded} />
      </SidebarHeader>
      <AppsContainer>
        <AppButton onClick={() => onAppSelect('telegram')}>
          <AppIcon>
            <FaTelegram />
          </AppIcon>
          <AppName isExpanded={isExpanded}>Telegram</AppName>
        </AppButton>
      </AppsContainer>
      <BottomContainer>
        <UccLogoImg src={uccLogo} alt="UCC Logo" />
        <UccText>INGENIERIA DE SOFTWARE</UccText>
      </BottomContainer>
    </SidebarContainer>
  );
}