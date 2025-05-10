import React from 'react';
import styled from 'styled-components';
import AppSidebar from './AppSidebar';
import ChatWindow from './ChatWindow';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const ContactsContainer = styled.div`
  width: 280px;
  border-right: 1px solid #dee2e6;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default function MainLayout() {
  return (
    <Layout>
      <ContactsContainer>
        <AppSidebar />
      </ContactsContainer>
      <ChatContainer>
        <ChatWindow />
      </ChatContainer>
    </Layout>
  );
}