import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
;

const Item = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f1f3f5;
  }
`;

export default function ContactList({ contacts }) {
  return (
    <List>
      {contacts.map((name, idx) => (
        <Item key={idx}>{name}</Item>
      ))}
    </List>
  );
}
