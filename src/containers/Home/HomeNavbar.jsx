import React from "react";
import styled from "styled-components";
import PjLogo from "../../assets/PJ_Logo.png";

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: rgba(12, 16, 33, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  height: 56px;
`;

const NavLink = styled.span`
  padding: 0.5rem 1rem;
  display: inline-block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  transition: color 0.2s;
  cursor: pointer;
  &:hover { color: #fff; }
`;

function HomeNavbar() {
  return (
    <NavBar>
      <a href="#home" style={{ display: "flex", alignItems: "center" }}>
        <img src={PjLogo} alt="pj_logo" height="44px" />
      </a>
      <NavLink>paulworks.online</NavLink>
    </NavBar>
  );
}

export default HomeNavbar;
