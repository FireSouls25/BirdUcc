import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: #ddd;
  }
  &:focus {
    outline: none;
  }
`;

function IconButton({ icon, onClick }) {
  return (
    <Button onClick={onClick}>
      {icon}
    </Button>
  );
}

export default IconButton;