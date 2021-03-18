import React, { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "react-neu";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { Provider } from 'react-redux'
import * as bsc from "@binance-chain/bsc-use-wallet";
import getRpcUrl from "./utils/getRpcUrl";
import getLibrary from "./utils/getLibrary";
import useLocalStorage from "./hooks/useLocalStorage";
import createTheme from "./utils/createCustomTheme";
import store from './state'

import { NetworkContextName } from "./constant";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage("darkMode", true);
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme();
  }, []);
  const rpcUrl = getRpcUrl() as string;
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID as string);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider
          darkModeEnabled={darkModeSetting}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
        >
     
          {children}
        </ThemeProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
};

export default Providers;
