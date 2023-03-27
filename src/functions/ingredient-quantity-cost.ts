import { IngredientQuantity } from '../types/ingredient-quantity'
import { Cost } from '../types/cost'

export const ingredientQuantityCost = (
  ingredientQuantity: IngredientQuantity,
): Cost => ingredientQuantity.quantity * ingredientQuantity.ingredient.cost
