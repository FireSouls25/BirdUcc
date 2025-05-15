import React from 'react';
import { Handle } from 'react-flow-renderer';
import styled from 'styled-components';

const Node = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #888;
  background-color: ${props => (props.isUser ? '#e0f7fa' : '#f0f0f0')};
  text-align: ${props => (props.isUser ? 'right' : 'left')};
  max-width: 250px;
  word-break: break-word;
`;

function MessageNode({ data }) {
  return (
    <Node isUser={data.isUser}>
      {data.text}
      {/* Puedes añadir más información al nodo si es necesario */}
    </Node>
  );
}

export default MessageNode;