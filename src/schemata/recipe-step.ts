import { IngredientQuantity } from "../types/ingredient-quantity";
import { array, InferType, lazy, object, string } from "yup";
import { ActionStep, actionStepSchema } from "./action-step";
import { AddIngredientsStep, addIngredientsStepSchema } from "./add-ingredients-step";

export const recipeStepSchema = lazy((step) => {
    switch (step?.type) {
        case 'action':
            return actionStepSchema
        case 'add-ingredients':
            return addIngredientsStepSchema
        default:
            throw new Error(`Unknown recipe step type '${step?.type}'`)
    }
})

export type RecipeStep = ActionStep | AddIngredientsStep;
