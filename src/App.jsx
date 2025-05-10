import React from 'react';
import styled from 'styled-components';
import MainLayout from './layouts/MainLayout';

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <MainLayout />
    </AppContainer>
  );
}

export default App;