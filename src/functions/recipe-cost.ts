import { Recipe } from "../schemata/recipe";
import { Cost, NoCost } from "../types/cost";
import { recipeStepCost } from "./recipe-step-cost";
import { sumOfCosts } from "./sumOfCosts";

export const recipeCost = (recipe: Recipe): Cost => (
    recipe.steps
        .map(recipeStepCost)
        .reduce(sumOfCosts)
)
