import { IngredientQuantity } from '../types/ingredient-quantity'
import { array, InferType, lazy, object, string } from 'yup'
import { ActionStep, actionStepSchema } from './action-step'
import {
  AddIngredientStep,
  addIngredientStepSchema,
} from './add-ingredient-step'

export const recipeStepSchema = lazy((step) => {
  switch (step?.type) {
    case 'action':
      return actionStepSchema
    case 'add-ingredient':
      return addIngredientStepSchema
    default:
      throw new Error(`Unknown recipe step type '${step?.type}'`)
  }
})

export type RecipeStep = ActionStep | AddIngredientStep
