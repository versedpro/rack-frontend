import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


const Home: React.FC = () => {


  return (
    <div>
      <HomeTitle>
        The Rack Vault currently has{' '}
        <AuvText>
          {/* {latestMarketCap?.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
          })}{' '} */}
        </AuvText>
      </HomeTitle>
      
      {/* <HomeHeaderCTA to='/dpi'>View the Index Pool</HomeHeaderCTA> */}
    </div>
  )
}

const HomeTitle = styled.p`
  font-size: 72px;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`

const AuvText = styled.span`
  font-size: 72px;
  line-height: 1;
  color: #F0B90B;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`

const HomeHeaderCTA = styled(NavLink)`
  color: white;
  background-color:#F0B90B;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color:#F0B90B;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

export default Home