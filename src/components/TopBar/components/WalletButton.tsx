import React from 'react'

import styled from 'styled-components'

import {Button} from 'react-neu'
import {useActiveWeb3React} from '../../../hooks'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { injected, bsc } from '../../../connectors'
const WalletButton:React.FC =() =>{
  
  const { active, account, connector, activate, error } = useWeb3React()
  
  // const {account,reset,connect,connector,status} = useWallet();
  const openWalletText = !!account ? account : 'Unlock Wallet'
    return(
          <StyledWalletButton>
              <Button
                onClick={()=>{activate(injected)}}
                size='sm'
                text={openWalletText}
              />
          </StyledWalletButton>
    )
}

const StyledWalletButton = styled.div`

`

export default WalletButton