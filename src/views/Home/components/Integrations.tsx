import React from 'react'
import { Surface, Spacer } from 'react-neu'
import styled from 'styled-components'

const Integrations: React.FC = () => (
  <div>
    <StyledIntegrationsTitle>
       Rack Vault
    </StyledIntegrationsTitle>

    <StyledIntegrationsContainer>

      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
          
              <StyledCardTitle>RACK Price:</StyledCardTitle>
              <StyledCardDescription>
               <span style={{color:'#f0b90b',fontWeight:'bold'}}>$61.531</span> 0.2237 BNB
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
         <Surface fill>
            <StyledCardContent>
          
              <StyledCardTitle>RACK Supply:</StyledCardTitle>
              <StyledCardDescription>
               <span style={{color:'#f0b90b',fontWeight:'bold'}}>484,230</span> 
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
          
              <StyledCardTitle>Market Cap:</StyledCardTitle>
              <StyledCardDescription>
               <span style={{color:'#f0b90b',fontWeight:'bold'}}>$29,818,018</span> 
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
      </StyledCardRow>

      <Spacer />


      <StyledCardRow>
        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
          
              <StyledCardTitle>TVL:</StyledCardTitle>
              <StyledCardDescription>
               <span style={{color:'#f0b90b',fontWeight:'bold'}}>$277,025,180</span> 
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>

        <Spacer />

        <StyledCardContainer>
          <Surface fill>
            <StyledCardContent>
          
              <StyledCardTitle>My TVL:</StyledCardTitle>
              <StyledCardDescription>
               <span style={{color:'#f0b90b',fontWeight:'bold'}}>--</span> 
              </StyledCardDescription>
            </StyledCardContent>
          </Surface>
        </StyledCardContainer>
        <Spacer />
      </StyledCardRow>
      <Spacer />
    </StyledIntegrationsContainer>
  </div>
)

const StyledIntegrationsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledIntegrationsTitle = styled.h2`
  font-size: 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.grey};
  padding-bottom: 30px;
  margin-bottom: 30px;
`

const StyledCardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledCardContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledFixedCardContainer = styled.div`
  height: 300px;
  flex: 1;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 60px;
  }
`

const StyledCardContent = styled.div`
  padding: 30px;
`

const StyledIntegrationTypeText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
`

const StyledCardTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`

const StyledCardIcon = styled.img`
  margin-bottom: 20px;
  width: 50px;
  border-radius: 50%;
`

const StyledCardDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
`

const StyledOutboundLink = styled.a`
  display: block;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.primary.light};
  font-weight: 700;
  text-decoration: none;
`

export default Integrations
