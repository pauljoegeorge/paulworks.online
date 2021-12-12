import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.nav`
  overflow: hidden;
`;

const NavBarLi = styled.a`
  float: ${(props) => (props?.left ? 'left' : 'right')};
  text-align: right;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;

  &:hover {
    background-color: #04aa6d;
    color: black;
  }

  &:active {
    background-color: #04aa6d;
    color: white;
  }
`;

const Navbar = (props) => {
  const { location } = props;
  return (
    <Wrapper>
      {location?.pathname !== '/blogs' && (
        <NavBarLi href="/blogs">| Blogs</NavBarLi>
      )}
      {location?.pathname !== '/' && <NavBarLi href="/">Home</NavBarLi>}
    </Wrapper>
  );
};

export default Navbar;
