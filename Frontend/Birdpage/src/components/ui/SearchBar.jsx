import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  padding: 8px;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  margin-right: 8px;
  color: #888;
`;

function SearchBar({ onSearch, placeholder }) {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  );
}

export default SearchBar;