import { RecipeStep, recipeStepSchema } from './recipe-step'
import { array, InferType, object, string } from 'yup'

export const recipeSchema = object({
  title: string().required(),
  description: string().defined(),
  steps: array<RecipeStep>(recipeStepSchema).required(),
})

export interface Recipe extends InferType<typeof recipeSchema> {}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const steps = [
    {
      type: 'action',
      description: 'Step 1',
    },
    {
      type: 'add-ingredient',
      ingredientId: 0,
      quantity: 0.5,
    },
  ]

  const fields = { title: 'Chicken Curry', description: 'A curry', steps }

  it('can be valid', () => {
    expect(recipeSchema.validateSync(fields)).toEqual(fields)
  })

  it('is invalid without a title', () => {
    expect(() => recipeSchema.validateSync({ ...fields, title: '' })).toThrow()
  })

  it('is valid without a description', () => {
    expect(
      recipeSchema.validateSync({ ...fields, description: '' }),
    ).not.toBeNull()
  })

  it('is valid without steps', () => {
    expect(recipeSchema.validateSync({ ...fields, steps: [] })).not.toBeNull()
  })

  it('is invalid with unrecognised steps', () => {
    expect(() =>
      recipeSchema.validateSync({ ...fields, steps: [{ something: 'else' }] }),
    ).toThrow()
  })
}
