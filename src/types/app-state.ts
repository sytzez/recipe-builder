import { Ingredient } from '../schemata/ingredient'
import { Recipe } from '../schemata/recipe'

export interface AppState {
  ingredients: readonly Ingredient[]
  recipes: readonly Recipe[]
}

export const initialAppState: AppState = {
  ingredients: [],
  recipes: [],
}
