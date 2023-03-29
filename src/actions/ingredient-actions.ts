import { SetStoreFunction, Store } from 'solid-js/store'
import { Ingredient } from '../schemata/ingredient'
import { AppState } from '../stores/app'

export type IngredientActions = ReturnType<typeof createIngredientActions>

export const createIngredientActions = (
  appState: Store<AppState>,
  setAppState: SetStoreFunction<AppState>,
) => {
  return {
    createIngredient: (ingredient: Ingredient) => {
      setAppState('ingredients', (ingredients) => [...ingredients, ingredient])

      return appState.ingredients.length - 1
    },
    updateIngredient: (id: number) => (ingredient: Ingredient) => {
      setAppState('ingredients', id, ingredient)
    },
    deleteIngredient: (id: number) => {
      setAppState((state) => ({
        ...state,
        ingredients: state.ingredients.filter((_, index) => index !== id),
        recipes: state.recipes.map((recipe) => ({
          ...recipe,
          steps: recipe.steps
            // Remove steps that use this ingredient
            .filter(
              (step) =>
                !(step.type === 'add-ingredient' && step.ingredientId === id),
            )
            // Decrement the ingredientIds of steps with ingredientIds higher than the deleted id
            .map((step) => {
              if (step.type === 'add-ingredient' && step.ingredientId > id) {
                return { ...step, ingredientId: step.ingredientId - 1 }
              }
              return step
            }),
        })),
      }))
    },
  }
}
