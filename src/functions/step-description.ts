import { RecipeStep } from '../schemata/recipe-step'
import { AppState } from '../types/app-state'
import { ActionStep } from '../schemata/action-step'
import { AddIngredientStep } from '../schemata/add-ingredient-step'

export const stepDescription = (step: RecipeStep, app: AppState) => {
  if (step.type === 'action') {
    return step.description
  }

  const ingredient = app.ingredients[step.ingredientId]

  if (!ingredient) {
    return 'Unknown ingredient'
  }

  return `Add ${step.quantity} ${ingredient.unitType} of ${ingredient.name}`
}
