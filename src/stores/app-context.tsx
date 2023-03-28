import { createContext, useContext } from 'solid-js'
import { Store } from 'solid-js/store'
import { AppActions, AppState, createApp } from './app'

const AppContext = createContext<[Store<AppState>, AppActions]>()

export const AppProvider = (props) => {
  const [appState, actions] = createApp()

  return (
    <AppContext.Provider value={[appState, actions]}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useApp = () =>
  useContext(AppContext) as [Store<AppState>, AppActions]
