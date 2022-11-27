import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { filters } from './common-types';
import EmailContainer from './email-body';

function App() {
  const filterItems = ['All', 'Unread', 'Read', 'Favorites'];
  const [currentFilter, setCurrentFilter] = useState<filters>('All');
  const changeFilterBy = (item: filters) => setCurrentFilter(item);
  const renderFilterButton = () => filterItems.map((item) => (<FilterButtons key={item} color={`${item === currentFilter}`} onClick={() => changeFilterBy(item as filters)}>{item}</FilterButtons>));

  return (
    <div>
      <GlobalStyle />
      <h3>Filter By: {renderFilterButton()} </h3> 
      <EmailContainer currentFilter={currentFilter} />
    </div>   
  );
}

export default App;

const FilterButtons = styled.button`
background-color: ${({ color }) => color === 'true' ? '#E1E4EA' : 'transparent'};
height: 40px;
width: auto;
padding: 0px 20px 0px 20px;
border: none;
color: ${({ color }) => color === 'true' ? '#636363' : 'black'};
border-radius: 20px;
font-size: 20px;
cursor: pointer;
margin: 0px 10px 0px 10px;
`; 

const GlobalStyle = createGlobalStyle`
body {
  background: #F4F5F9;
}`;