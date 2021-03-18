import {useMemo} from 'react'
import { parseBytes32String } from '@ethersproject/strings'
import {Currency,ETHER,Token,currencyEquals} from '@pancakeswap-libs/sdk'

import {useActiveWeb3React} from './index'

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue
}

// export function useToken(tokenAddress?:string):Token | undefined | null{
//    const {chainId} = useActiveWeb3React();

// }

// export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
//     const isETH = currencyId?.toUpperCase() === 'ETH'
//     const token = useToken(isETH ? undefined : currencyId)
//     return isETH ? ETHER : token
//   }


