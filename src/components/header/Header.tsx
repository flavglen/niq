import React from 'react';
import styled from 'styled-components';

const CustomHeader = styled.header`
display: flex;
height: 65px;
align-items: center;
justify-content: center;
background-color: #181818;
color: #fff;
font-size: 2.5rem;
`

const  Header = () => {
  return (
    <CustomHeader className="header">
        My Fabulous Store
    </CustomHeader>
  )
}

export default Header;