import { IngredientQuantity } from '../types/ingredient-quantity'
import { costOf } from "./costOf";
import { Cost } from "../types/cost";

export const ingredientQuantityCost = (ingredientQuantity: IngredientQuantity): Cost => (
    costOf(
        ingredientQuantity.quantity,
        ingredientQuantity.ingredient.cost,
    )
)
