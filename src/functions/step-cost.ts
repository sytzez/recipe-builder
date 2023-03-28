import { RecipeStep } from "../schemata/recipe-step";
import { AppState } from "../types/app-state";
import { noCost, unknownCost } from "../types/cost";

export const stepCost = (step: RecipeStep, app: AppState) => {
  if (step.type === 'action') {
    return noCost
  }

  const ingredient = app.ingredients[step.ingredientId]

  if (! ingredient) {
    return unknownCost
  }

  return step.quantity * ingredient.cost
}
