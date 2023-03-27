import { array, InferType, number, object, string } from "yup";

export const addIngredientStepSchema = object({
  type: string().is(['add-ingredient']).required(),
  ingredientId: number().integer().min(0).required().label('Ingredient'),
  quantity: number().positive().required(),
})

export interface AddIngredientStep
  extends InferType<typeof addIngredientStepSchema> {}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const fields = { type: 'add-ingredient', ingredientId: 0, quantity: 0.5 }

  it('can be valid', () => {
    expect(addIngredientStepSchema.validateSync(fields)).toEqual(fields)
  })

  it('is invalid with the wrong type', () => {
    expect(() =>
      addIngredientStepSchema.validateSync({ ...fields, type: 'action' }),
    ).toThrow()
  })

  it('is invalid without an ingredient id', () => {
    expect(() =>
      addIngredientStepSchema.validateSync({ ...fields, ingredientId: null }),
    ).toThrow()
  })

  it('is invalid without a quantity', () => {
    expect(() =>
      addIngredientStepSchema.validateSync({ ...fields, quantity: null }),
    ).toThrow()
  })

  it('is invalid with a negative quantity', () => {
    expect(() =>
      addIngredientStepSchema.validateSync({ ...fields, quantity: -.5 })
    ).toThrow()
  })

  it('is invalid with a quantity of zero', () => {
    expect(() =>
      addIngredientStepSchema.validateSync({ ...fields, quantity: 0 })
    ).toThrow()
  })
}
