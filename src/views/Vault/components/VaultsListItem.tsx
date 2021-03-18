import React,{ useCallback, useContext, useEffect, useMemo, useState }  from 'react'
import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap-libs/sdk'
import { useActiveWeb3React } from '../../../hooks'
import styled from "styled-components";
import logo from "../../../assets/images/logo.png";
import DepositModal from './subcomponent/DespositModal';
interface Item {
  item: any;
}
const VaultsListItem: React.FC<Item> = ({ item }) => {
    const [collapse,setCollapse] = React.useState('');
    const [check,setCheck] = React.useState(false);
    const [deposit,setDespoit] = React.useState(false);
    const onCollapse =(name:string) =>{
       if(check){
         setCollapse('');
         setCheck(false);
       }
       else{
           setCollapse(name);
           setCheck(true);
       }
      
    }
  return (
    <StyledVaultsListItemContainer>
      <StyledVaultsListItemContent onClick={()=>onCollapse(item.name)}>
        <StyledVaultsListItemContentImage>
          <img
            style={{ width: "100%" }}
            src={item.icon !== "" ? item.icon : logo}
          />
        </StyledVaultsListItemContentImage>
        <StyledVaultsListHeaderSecond>
          <StyledVaultsListHeaderSpace>
            <StyledCenter>
              <span>{item.name}</span>
            </StyledCenter>
          </StyledVaultsListHeaderSpace>
          <StyledVaultsListHeaderContent>
            <StyledVaultsListHeaderContentRow>
              <StyledVaultsListHeaderContentItem>
                <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                  {item.apy}
                </span>
              </StyledVaultsListHeaderContentItem>
              <StyledVaultsListHeaderContentItem>
                <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                  {item.daily}
                </span>
              </StyledVaultsListHeaderContentItem>
            </StyledVaultsListHeaderContentRow>
          </StyledVaultsListHeaderContent>
          <StyledVaultsListHeaderContent1>
            <StyledVaultsListHeaderContentRow>
              <StyledVaultsListHeaderContentItem1>
                <span style={{ color: "#6c757d" }}>{item.tvl}</span>
              </StyledVaultsListHeaderContentItem1>
              <StyledVaultsListHeaderContentItem1>
            <span style={{ color: "#6c757d" }}>--</span>
              </StyledVaultsListHeaderContentItem1>
            </StyledVaultsListHeaderContentRow>
          </StyledVaultsListHeaderContent1>
        </StyledVaultsListHeaderSecond>
      </StyledVaultsListItemContent>
      <div style={{display:collapse ===item.name?'block':'none'}}>
        <StyledVaultsListItemCollaspe>
          <StyledVaultsListItemCollaspeStart>
            <StyledVaultsListItemCollaspeWallet>
              <div>
                <WalletContent>
                  <WalletTitle>
                    <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                      Wallet
                    </span>
                  </WalletTitle>
                  <WalletValue>
                    <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                     --
                    </span>
                  </WalletValue>
                </WalletContent>
              </div>
              <div>
                <WalletContent>
                  <WalletTitle>
                    <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                      RACK Boost
                    </span>
                    <div>
                        <div style={{display:'flex'}}>
                          <span style={{ color: "#6c757d", fontSize: "0.7em" }}>
                          2.5X On First:
                          </span>
                          <span style={{ color: "#6c757d", fontSize: "0.8em" }}>
                             0 BNB ($0)
                           </span>
                        </div>
                     
                    </div>
                  </WalletTitle>
                </WalletContent>
              </div>
            </StyledVaultsListItemCollaspeWallet>
            <StyledVaultsListItemCollaspeOrder>
              <div className="vault-apy">
                <StyledApy>
                  <ApyItemContainer>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                        Vault APY:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.apy}
                      </span>
                    </ApyItem2>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                        Vault APR:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.apr}
                      </span>
                    </ApyItem2>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                        Vault Daily:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.daily}
                      </span>
                    </ApyItem2>
                  </ApyItemContainer>
                </StyledApy>
              </div>
              <div className="farm-apy">

              <StyledApy>
                  <ApyItemContainer>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                      RACK APR:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.apy}
                      </span>
                    </ApyItem2>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                       RACK Daily:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.apr}
                      </span>
                    </ApyItem2>
                    <ApyItem1>
                      <span style={{ color: "#6c757d", fontSize: "0.9em" }}>
                       RACK Weight:
                      </span>
                    </ApyItem1>
                    <ApyItem2>
                      <span style={{ color: "#f0b90b", fontWeight: "bold" }}>
                        {item.daily}
                      </span>
                    </ApyItem2>
                  </ApyItemContainer>
                </StyledApy>
              </div>
            </StyledVaultsListItemCollaspeOrder>
          </StyledVaultsListItemCollaspeStart>
          <StyledVaultsListItemCollaspeEnd>
            <div style={{display:deposit?'none':'block'}}>
              <button
              onClick={()=>{setDespoit(true)}} 
              style={{
                  width:100,
                  height:40,
                  background:'transparent',
                  outline:'none',
                  borderWidth:1,
                  borderColor:'white',
                  borderRadius:5,
                  cursor:'pointer'
              }}>
                <span style={{color:'white',fontWeight:'bold'}}>Deposit</span>
              </button>
            </div>
            <div style={{display:deposit?'block':'none'}}>
              <DepositModal setDeposit ={setDespoit}/>
            </div>
            <div style={{marginTop:10}}>
              <a href="" style={{color:'white'}}><span>Get cake</span></a>
            </div>
          </StyledVaultsListItemCollaspeEnd>
        </StyledVaultsListItemCollaspe>
      </div>
    </StyledVaultsListItemContainer>
  );
};


const InputBox = styled.input`
    margin-top: .25rem!important;
    margin-bottom: .25rem!important;
    display: block;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

`

const StyledVaultsListItemContainer = styled.div`
  background-color: rgb(18, 22, 28) !important;
  padding: 0.5rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
  box-sizing: border-box;
  cursor: pointer;
`;
const StyledVaultsListItemContent = styled.div`
  display: flex !important;
`;
const StyledVaultsListItemContentImage = styled.div`
     width: 2em;
     margin-right: .5rem!important;
}
`;

const StyledCenter = styled.div` 
height: 100%;
align-items: center;
display: flex;
}
`;

const StyledVaultsListHeaderFirst = styled.div`
  width: 2em;
  margin-right: 0.5rem !important;
  box-sizing: border-box;
  display: block;
`;
const StyledVaultsListHeaderSecond = styled.div`
  flex-grow: 1 !important;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
`;

const StyledVaultsListHeaderSpace = styled.div`
  flex: 0 0 auto;
  width: 41.6666666667%;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }
`;
const StyledVaultsListHeaderContent = styled.div`
  flex: 0 0 auto;
  width: 25%;
`;
const StyledVaultsListHeaderContentRow = styled.div`
  --bs-gutter-y: 0;
  --bs-gutter-x: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
`;
const StyledVaultsListHeaderContentItem = styled.div`
  text-align: center !important;
  flex: 0 0 auto;
  width: 100%;
  @media (min-width: 576px) {
    flex: 1 0 0%;
  }
`;
const StyledVaultsListHeaderContent1 = styled.div`
  flex: 1 0 0%;
`;
const StyledVaultsListHeaderContentItem1 = styled.div`
  text-align: center !important;
  flex: 0 0 auto;
  width: 100%;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 41.6666666667%;
  }
`;

const StyledVaultsListItemCollaspe = styled.div`
  --bs-gutter-y: 0;
  --bs-gutter-x: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
`;

const StyledVaultsListItemCollaspeStart = styled.div`
  --bs-gutter-y: 0;
  --bs-gutter-x: 0;
  flex: 0 0 auto;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 66.6666666667%;
  }
`;

const StyledVaultsListItemCollaspeEnd = styled.div`
  text-align: right !important;
  flex: 1 0 0%;
`;
const StyledVaultsListItemCollaspeWallet = styled.div`
  padding: 0.5rem !important;
  flex: 0 0 auto;
  width: 100%;
  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 50%;
  }
`;
const StyledVaultsListItemCollaspeOrder = styled.div`
  padding: 0.5rem !important;
  flex: 1 0 0%;
  @media (min-width: 576px) {
    order: -1 !important;
  }
`;

const WalletContent = styled.div`
  margin-bottom: 1rem !important;

  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
`;

const WalletTitle = styled.div`
  flex: 0 0 auto;
  width: 41.6666666667%;
`;
const WalletValue = styled.div`
  flex: 1 0 0%;
`;

const StyledApy = styled.div`
  margin-bottom: 1rem !important;
`;

const ApyItemContainer = styled.div`
  --bs-gutter-x: 1.5rem;
  margin-left: 20px !important;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
`;
const ApyItem1 = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;
const ApyItem2 = styled.div`
  flex: 1 0 0%;
`;

export default VaultsListItem;
