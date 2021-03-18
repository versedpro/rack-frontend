import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/vault">
        Vaults
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/swap">
        StableSwap
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/about">
        About
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`;

const StyledLink = styled(NavLink)`
  color: #fff;
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #f0b90b;
  }
  &.active {
    color: #f0b90b;
  }
`;

export default Nav;
