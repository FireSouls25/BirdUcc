import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTelegram, FaDiscord, FaWhatsapp } from 'react-icons/fa';
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
  height: 65px;
  width: 65px;
  object-fit: contain;
  margin-left: 10px;
  display: ${props => props.isExpanded ? 'block' : 'none'};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }
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
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #34495e;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const AppIcon = styled.div`
  font-size: 24px;
  min-width: 24px;
  display: flex;
  justify-content: center;
  transition: transform 0.2s;
  ${AppButton}:hover & {
    transform: scale(1.2);
  }
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
  height: 42px;
  width: 42px;
  object-fit: contain;
  margin-right: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }
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
        <AppButton onClick={() => onAppSelect('discord')}>
          <AppIcon>
            <FaDiscord />
          </AppIcon>
          <AppName isExpanded={isExpanded}>Discord</AppName>
        </AppButton>
        <AppButton onClick={() => onAppSelect('whatsapp')}>
          <AppIcon>
            <FaWhatsapp />
          </AppIcon>
          <AppName isExpanded={isExpanded}>WhatsApp</AppName>
        </AppButton>
      </AppsContainer>
      <BottomContainer>
        <UccLogoImg src={uccLogo} alt="UCC Logo" />
        <UccText>INGENIERIA DE SOFTWARE</UccText>
      </BottomContainer>
    </SidebarContainer>
  );
}