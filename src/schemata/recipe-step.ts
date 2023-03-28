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

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('can validate an action step', () => {
    const step = { type: 'action', description: 'Do something' }

    expect(recipeStepSchema.validateSync(step)).toEqual(step)
  })

  it('can validate an ingredient step', () => {
    const step = { type: 'add-ingredient', ingredientId: 1, quantity: 2.5 }

    expect(recipeStepSchema.validateSync(step)).toEqual(step)
  })

  it('is invalid with an unknown type', () => {
    const step = { type: 'unknown-step' }

    expect(() => recipeStepSchema.validateSync(step)).toThrow()
  })
}
