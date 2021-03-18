import { stubArray } from 'lodash'
import React from 'react'
import styled from 'styled-components'

const VaultsListHeader:React.FC =() =>{
  
    return(
        <StyledVaultsListHeader>
            <StyledVaultsListHeaderFirst/>

            <StyledVaultsListHeaderSecond>
                <StyledVaultsListHeaderSpace/>
                 <StyledVaultsListHeaderContent>
                   <StyledVaultsListHeaderContentRow>
                   <StyledVaultsListHeaderContentItem>
                     <span>APY</span>
                   </StyledVaultsListHeaderContentItem>
                   <StyledVaultsListHeaderContentItem>
                      <span>Daily</span>
                   </StyledVaultsListHeaderContentItem>
                   
                   </StyledVaultsListHeaderContentRow>
                 </StyledVaultsListHeaderContent>
                 <StyledVaultsListHeaderContent1>
                    <StyledVaultsListHeaderContentRow>
                      <StyledVaultsListHeaderContentItem1>
                         <span>TVL</span>
                      </StyledVaultsListHeaderContentItem1>
                      <StyledVaultsListHeaderContentItem1>
                         <span>Balance</span>
                      </StyledVaultsListHeaderContentItem1>
                    </StyledVaultsListHeaderContentRow>
                 </StyledVaultsListHeaderContent1>
            </StyledVaultsListHeaderSecond>
        </StyledVaultsListHeader>
    )

}

const StyledVaultsListHeader =styled.div`
    font-size: 88%;
    font-weight: bold;
    color: #6c757d!important;
    padding-right: .5rem!important;
    padding-left: .5rem!important;
    display: flex!important;
    box-sizing: border-box;
`
const StyledVaultsListHeaderFirst =styled.div`
     width: 2em;  
     margin-right: .5rem!important;
     box-sizing: border-box;
     display: block;
`
const StyledVaultsListHeaderSecond =styled.div`
     flex-grow: 1!important;
     --bs-gutter-y: 0;
     display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)*-1);
    margin-right: calc(var(--bs-gutter-x)/-2);
    margin-left: calc(var(--bs-gutter-x)/-2);
`

const StyledVaultsListHeaderSpace =styled.div`
    flex: 0 0 auto;
    width: 41.6666666667%;
  @media (min-width: 576px){
        flex: 0 0 auto;
        width: 41.6666666667%;
   }

`
const StyledVaultsListHeaderContent =styled.div`
    flex: 0 0 auto;
    width: 25%;
`
const StyledVaultsListHeaderContentRow =styled.div`
    --bs-gutter-y: 0;
    --bs-gutter-x: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(var(--bs-gutter-y)*-1);
    margin-right: calc(var(--bs-gutter-x)/-2);
    margin-left: calc(var(--bs-gutter-x)/-2);
`
const StyledVaultsListHeaderContentItem =styled.div`
   text-align: center!important;
   flex: 0 0 auto;
   width: 100%;
   @media (min-width: 576px){
       flex: 1 0 0%;
   }
`
const StyledVaultsListHeaderContent1 =styled.div`
    flex: 1 0 0%;
`
const StyledVaultsListHeaderContentItem1 =styled.div`
   text-align: center!important;
   flex: 0 0 auto;
   width: 100%;
   @media (min-width: 576px){
    flex: 0 0 auto;
    width: 41.6666666667%;
   }
`
export default VaultsListHeader;