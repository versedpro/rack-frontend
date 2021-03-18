import React, { useEffect } from 'react'
import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'
import Page from '../../components/Page'
import VaultsList from './components/VaultsList'
import VaultsListHeader from './components/VaultsListHeader'


const Vault = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  return (
    <Page>
     <StyledVaultContainer>
        <VaultsList/>
     </StyledVaultContainer>
    </Page>
  )
}

const StyledVaultContainer=styled.div`
        box-sizing: border-box;
        margin: 0 auto;
        max-width: 1000px;
        padding: 50px 24px;
        width: 100%;
        background:#222;
        
`


export default Vault