import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="#">Twitter</StyledLink>
      <StyledLink href="#">Facebook</StyledLink>
      <StyledLink href="#">Discord</StyledLink>
      <StyledLink href="#">Github</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: #F0B90B;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #F0B90B;
  }
`

export default Nav
