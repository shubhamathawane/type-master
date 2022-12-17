import React, { useState } from "react";
// import Button from '@mui/material/Button';
// import NightsStayIcon from "@mui/icons-material/NightsStay";
import styled from "styled-components";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import LightIcon from "@mui/icons-material/Light";
import { Link } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Button = styled.button`
    border: none;
    background-color: transparent;
    color: gray;
    cursor: pointer;
  `;

  return (
    <Nav>
      <Logo href="">
        <span></span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <Button
          title="change Theme"
          onClick={() => setDarkMode(!darkMode)}
          variant="outlined"
          pill
        >
          {darkMode ? (
            <p>Light Mode</p>
          ) : (
            <p>Dark Mode</p>
          )}
        </Button>

        <Slink to="/">Home</Slink>
        <Slink to="">About</Slink>
        <Slink to="">Contact</Slink>
      </Menu>
    </Nav>
  );
};

export default NavBar;

const Slink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #67bc98;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  &:hover {
    color: #7b7fda;
  }
`

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: jetBrains Mono;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:sticky;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #55f56a84;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
