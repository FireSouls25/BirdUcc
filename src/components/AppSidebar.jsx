import React, { useState } from 'react';
import styled from 'styled-components';
import ContactList from './ContactList';

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const SearchInput = styled.input`
  width: calc(100% - 32px);
  margin: 12px 16px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

export default function AppSidebar() {
  const [filter, setFilter] = useState('');
  const contacts = ['Juan Pérez', 'Jano', 'Clara', 'Laura'];

  const filtered = contacts.filter(name =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <SidebarHeader>
        <Title>BirdUcc</Title>
      </SidebarHeader>
      <SearchInput
        placeholder="Buscar"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ContactList contacts={filtered} />
    </>
  );
}