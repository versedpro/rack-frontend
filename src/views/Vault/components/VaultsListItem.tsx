import React,{ useCallback, useContext, useEffect, useMemo, useState }  from 'react'
import { CurrencyAmount, JSBI, Trade } from '@pancakeswap-libs/sdk'
import { useActiveWeb3React } from '../../../hooks'
import styled from "styled-components";
import logo from "../../../assets/images/logo.png";
import DepositModal from './subcomponent/DespositModal';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import useSWR from 'swr'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther, formatUnits } from '@ethersproject/units'
import axios from 'axios'
import ERC20ABI from '../../../constant/abi/erc20.json'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'

interface Item {
  item: any;
}

interface Bnb {
  setBalance: any;
}

interface Tokens {
  address: string;
  decimals: number;
  setBalance: any;
}

interface Balance {
  balance: any;
  name: string;
}

const fetcher = (library: any, abi?: any) => (...args:any[]) => {
  const [arg1, arg2, ...params] = args
  // it's a contract
  if (isAddress(arg1)) {
    const address = arg1
    const method = arg2
    const contract = new Contract(address, abi, library.getSigner())
    return contract[method](...params)
  }
  // it's a eth call
  const method = arg1
  return library[method](arg2, ...params)
}

export const BnbBalance: React.FC<Bnb> = ({ setBalance }) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library, ERC20ABI),
  })

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`)
    if (library) {
      library.on('block', () => {
        console.log('update balance...')
        mutate(undefined, true)
      })
      // remove listener when the component is unmounted
      return () => {
        library.removeAllListeners('block')
      }
    }
    // trigger the effect only on component mount
  }, [])

  useEffect(() => {
    setBalance(balance)
  },[balance])
  
  if (!balance) {
    return <div>--</div>
  }
  return <div>{parseFloat(formatEther(balance)).toPrecision(4)}</div>
}

export const TokenBalance: React.FC<Tokens> = ({ address, decimals, setBalance }) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
    fetcher: fetcher(library, ERC20ABI),
  })

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)
    if (library) {
      const contract = new Contract(address, ERC20ABI, library.getSigner())
      const fromMe = contract.filters.Transfer(account, null)
      library.on(fromMe, (from, to, amount, event) => {
        console.log('Transfer|sent', { from, to, amount, event })
        mutate(undefined, true)
      })
      const toMe = contract.filters.Transfer(null, account)
      library.on(toMe, (from, to, amount, event) => {
        console.log('Transfer|received', { from, to, amount, event })
        mutate(undefined, true)
      })
      // remove listener when the component is unmounted
      return () => {
        library.removeAllListeners(toMe)
        library.removeAllListeners(fromMe)
      }
    }

    
    // trigger the effect only on component mount
  }, [])

  useEffect(() => {
    setBalance(balance)
  },[balance])
  
  if (!balance) {
    return <div>--</div>
  }
  return (
    <div>
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)}
    </div>
  )
}

const CalculatePrice: React.FC<Balance> = ({ balance, name }) => {
  const [usdPrice, setBnbUsd] = React.useState<any>(0);
  const getData = async() =>{
    const _usdPrice : any = await axios.get(`https://api.binance.com/api/v1/ticker/price?symbol=${name}USDT`);
    setBnbUsd(_usdPrice.data.price);
  }
  useEffect(() => {
    getData();
  },[])

  if(!balance){
    return <div>--</div>;
  }
  return <div>${ parseInt((balance * usdPrice / 1e18).toString()) }</div>
}

const VaultsListItem: React.FC<Item> = ({ item }) => {
    const [collapse,setCollapse] = React.useState('');
    const [check,setCheck] = React.useState(false);
    const [deposit,setDespoit] = React.useState(false);
    const [bal, setBalance] = React.useState(0);

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
                <span style={{ color: "#6c757d" }}>
                  {
                    item.name !== "Rack" ? ( <CalculatePrice balance={bal} name={item.name}/> ) : <div>--</div>
                  }
                </span>
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
                        {
                          item.name == "BNB" ? ( <BnbBalance setBalance = {setBalance}/>) : (<TokenBalance address={item.address} decimals = {18} setBalance = {setBalance} />)
                        }
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
