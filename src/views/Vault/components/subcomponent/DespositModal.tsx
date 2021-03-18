import React,{ useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { Contract } from '@ethersproject/contracts'

import { CurrencyAmount, JSBI, Token, Trade } from '@pancakeswap-libs/sdk'
import { useActiveWeb3React } from '../../../../hooks'
import { maxAmountSpend } from '../../../../utils/maxAmountSpend'
import {useTokenContract} from '../../../../hooks/useContract'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import {useSingleCallResult} from '../../../../state/multicall/hooks'
import ERC20_ABI from '../../../../constant/abi/erc20.json'
import {getContract} from '../../../../utils/web3'



interface Props{
    setDeposit :(parameter:boolean)=>void
}

const DepositModal = (props:Props) => {

  // const maxAmountInput:CurrencyAmount | undefined = maxAmountSpend(currencyBalances[]);
  const { account } = useActiveWeb3React();
  let currency={decimals: 18, symbol: "BNB", name: "Binance"};
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

   let contract= getContract(ERC20_ABI,'0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c');
    
   console.log('balance...',contract)


  // async function getBalance() {
  //   let balance = await contract.methods.balanceOf(account).call();
  //   console.log("balance****",balance);
  //   return balance;
  // }
 
  const handleMaxInput =async()=>{
    let balance = await contract.methods.balanceOf(account).call();
    console.log("balance****",balance);
  }


  return (
    <div>
      <span style={{ color: "#f0b90b" }} onClick={handleMaxInput}>Max</span>

      <InputWrapper>
        <input
          type="number"
          placeholder="0"
          min={0}
          style={{
            background: "transparent",
            color: "#fff",
            marginTop: ".5rem!important",
            marginBottom: ".25rem!important",
            fontWeight: 400,
            width: "80%",
            display: "block",
            appearance: "none",
            paddingTop: 5,
            paddingBottom: 5,
            outline: "none",
            borderColor: "#ced4da",
            borderWidth: 1,
            borderRadius: 2.5,
            paddingLeft: 5,
          }}
        />
      </InputWrapper>
      <div style={{marginTop:10}}>
        <button
        onClick={()=>{
            props.setDeposit(false);
        }}
          style={{
            width: 80,
            height: 30,
            background: "transparent",
            outline: "none",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "white", fontWeight: "bold" }}>Cancel</span>
        </button>
        <button
          style={{
            width: 80,
            height: 30,
            background: "transparent",
            outline: "none",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 5,
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          <span style={{ color: "white", fontWeight: "bold" }}>Deposit</span>
        </button>
      </div>
    </div>
  );
};

const InputWrapper = styled.div`
margin-bottom: .5rem!important;
margin: .25rem!important;

    display: flex;
    align-items: end;
    justify-content: flex-end;
`

export default DepositModal;
