import { RecipeStep } from '../types/recipe-step'
import { Cost } from '../types/cost'
import { ingredientQuantityCost } from "./ingredient-quantity-cost";

export const recipeStepCost = (recipeStep: RecipeStep): Cost => {
    switch (recipeStep.type) {
        case 'action':
            return 0 as Cost
        case 'add-ingredients':
            return recipeStep.quantities.reduce(
                (costAccumulator, ingredientQuantity) => costAccumulator + ingredientQuantityCost(ingredientQuantity),
                0 as Cost
            )
    }
}
