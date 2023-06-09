import { SetStoreFunction, Store } from 'solid-js/store'
import { AppState } from './app-state'
import { Recipe } from '../schemata/recipe'

export type RecipeActions = ReturnType<typeof createRecipeActions>

export const createRecipeActions = (
  appState: Store<AppState>,
  setAppState: SetStoreFunction<AppState>,
) => {
  return {
    createRecipe: (recipe: Recipe) => {
      setAppState('recipes', (recipes) => [...recipes, recipe])

      return appState.recipes.length - 1
    },
    updateRecipe: (id: number) => (recipe: Recipe) => {
      setAppState('recipes', id, recipe)
    },
    deleteRecipe: (id: number) => {
      setAppState('recipes', (recipes) =>
        recipes.filter((_, index) => index !== id),
      )
    },
  }
}
