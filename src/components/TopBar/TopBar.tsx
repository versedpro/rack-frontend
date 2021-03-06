import React from "react";
import { Container, Spacer } from "react-neu";
import styled from "styled-components";
import Logo from "../Logo";
import Nav from "./components/Nav";
import WalletButton from "./components/WalletButton";
import "./style.css";
interface TopBarProps {
  onPresentMobileMenu: () => void;
}
const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledNavWrapper>
            <Nav />
          </StyledNavWrapper>
          <StyledAccountButtonWrapper>
            <Spacer />
            <WalletButton />
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};
const StyledTopBar = styled.div`
  position: fixed;
  background-color: rgb(18, 22, 28);
  width: 100%;
  z-index: 100;
`;
const StyledLogoWrapper = styled.div`
  width: 200px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 200px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`;

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 768px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
    margin-left: 10px;
  }
`;
export default TopBar;
