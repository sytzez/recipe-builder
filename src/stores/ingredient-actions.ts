import { SetStoreFunction, Store } from "solid-js/store";
import { AppState } from "../types/app-state";
import { Ingredient } from "../types/ingredient";

export type IngredientActions = ReturnType<typeof createIngredientActions>

export const createIngredientActions = (appState: Store<AppState>, setAppState: SetStoreFunction<AppState>) => {
    return {
        createIngredient: (ingredient: Ingredient) => {
            setAppState('ingredients', (ingredients) => [ ...ingredients, ingredient ])

            return appState.ingredients.length - 1
        },
        updateIngredient: (id: number) => (ingredient: Ingredient) => {
            setAppState('ingredients', id, ingredient)
        }
    }
}
