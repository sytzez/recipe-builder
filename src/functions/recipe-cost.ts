import { Recipe } from "../types/recipe";
import { Cost } from "../types/cost";
import { recipeStepCost } from "./recipe-step-cost";

export const recipeCost = (recipe: Recipe): Cost => (
    recipe.steps.reduce(
        (costAccumulator, step) => costAccumulator + recipeStepCost(step),
        0 as Cost
    )
)
