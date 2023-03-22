import { IngredientQuantity } from "./ingredient-quantity";

export type RecipeStep = ActionStep | AddIngredientsStep;

export interface ActionStep {
    type: 'action'
    description: string
}

export interface AddIngredientsStep {
    type: 'add-ingredients'
    quantities: IngredientQuantity[]
}
