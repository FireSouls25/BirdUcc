import React, { useState } from 'react';
import styled from 'styled-components';
import AppSidebar from './AppSidebar';
import TelegramClient from './TelegramClient';
import DiscordClient from './DiscordClient';
import WhatsAppClient from './WhatsAppClient';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f8;
`;

export default function MainLayout() {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleAppSelect = (appName) => {
    setSelectedApp(appName);
  };

  const renderAppContent = () => {
    switch (selectedApp) {
      case 'telegram':
        return <TelegramClient />;
      case 'discord':
        return <DiscordClient />;
      case 'whatsapp':
        return <WhatsAppClient />;
      default:
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#666',
            fontSize: '1.2rem'
          }}>
            Select an app from the sidebar
          </div>
        );
    }
  };

  return (
    <Layout>
      <AppSidebar onAppSelect={handleAppSelect} />
      <ContentContainer>
        {renderAppContent()}
      </ContentContainer>
    </Layout>
  );
}