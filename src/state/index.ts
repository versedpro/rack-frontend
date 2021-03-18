import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {save,load} from 'redux-localstorage-simple'
import { updateVersion } from './global/action'

import application from './application/reducer'
import multicall from './multicall/reducer'

type MergedState = {
    user: {
      [key: string]: any
    }
    transactions: {
      [key: string]: any
    }
  }
  const PERSISTED_KEYS: string[] = ['user']
  const loadedState = load({ states: PERSISTED_KEYS }) as MergedState
  if (loadedState.user) {
    // loadedState.user.userDarkMode = getThemeCache()
  }
  
  const store = configureStore({
    reducer: {
      application,
    //   user,
    //   transactions,
    //   swap,
    //   mint,
    //   burn,
      multicall,
    //   lists,
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
    // preloadedState: loadedState,
  })
  
  store.dispatch(updateVersion())
  
  export default store
  
  export type AppState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  