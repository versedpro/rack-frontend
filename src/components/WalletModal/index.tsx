import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {UnsupportedChainIdError,useWeb3React} from '@web3-react/core'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

import usePrevious from '../../hooks/usePrevious'
