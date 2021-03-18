import React from 'react'
import styled from 'styled-components'
import VaultsListHeader from './VaultsListHeader'
import {vaultData} from '../../../constant/data-vault'
import VaultsListItem from './VaultsListItem'

const VaultsList:React.FC =() =>{
  
    return(
        <StyledVaultsListContainer>
            <VaultsListHeader/>
            {
                vaultData.map(item=>(
                    <VaultsListItem item={item}/>
                ))
            }

        </StyledVaultsListContainer>
    )

}

const StyledVaultsListContainer =styled.div`

`

export default VaultsList;