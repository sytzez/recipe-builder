import { Ingredient } from '../schemata/ingredient'
import { Recipe } from '../schemata/recipe'
import { createLocalStore } from '../utilities/create-local-store'
import {
  createIngredientActions,
  IngredientActions,
} from '../actions/ingredient-actions'
import { createRecipeActions, RecipeActions } from '../actions/recipe-actions'
import { Store } from 'solid-js/store'

export interface AppState {
  ingredients: readonly Ingredient[]
  recipes: readonly Recipe[]
}

export const initialAppState: AppState = {
  ingredients: [],
  recipes: [],
}

export type AppActions = IngredientActions & RecipeActions

export const createApp = (): [Store<AppState>, AppActions] => {
  const [appState, setAppState] = createLocalStore('appState', initialAppState)

  const actions = {
    ...createIngredientActions(appState, setAppState),
    ...createRecipeActions(appState, setAppState),
  }

  return [appState, actions]
}
