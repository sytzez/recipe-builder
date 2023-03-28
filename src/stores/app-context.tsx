import { createContext, useContext } from 'solid-js'
import { createStore, Store } from 'solid-js/store'
import { AppState, initialAppState } from '../types/app-state'
import {
  IngredientActions,
  createIngredientActions,
} from './ingredient-actions'
import { createRecipeActions, RecipeActions } from './recipe-actions'
import { createLocalStore } from "../utilities/create-local-store";

export type AppActions = IngredientActions & RecipeActions

const AppContext = createContext<[Store<AppState>, AppActions]>()

export const AppProvider = (props) => {
  const [appState, setAppState] = createLocalStore('appState', initialAppState)

  const actions = {
    ...createIngredientActions(appState, setAppState),
    ...createRecipeActions(appState, setAppState),
  }

  return (
    <AppContext.Provider value={[appState, actions]}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
