import { RecipeStep } from '../types/recipe-step'
import { Cost, NoCost } from '../types/cost'
import { ingredientQuantityCost } from "./ingredient-quantity-cost";
import { sumOfCosts } from "./sumOfCosts";

export const recipeStepCost = (recipeStep: RecipeStep): Cost => {
    switch (recipeStep.type) {
        case 'action':
            return NoCost

        case 'add-ingredients':
            return recipeStep.quantities
                .map(ingredientQuantityCost)
                .reduce(sumOfCosts)
    }
}
