import { array, InferType, object, string } from "yup";

export const addIngredientsStepSchema = object({
    type: string().is(['add-ingredients']).required(),
    quantities: array().required(), // TODO: ingredient quantities
})

export interface AddIngredientsStep extends InferType<typeof addIngredientsStepSchema> {}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest

    const fields = { type: 'add-ingredients', quantities: [] } // TODO: add quantities

    it('can be valid', () => {
        expect(addIngredientsStepSchema.validateSync(fields)).toEqual(fields)
    })

    it('is invalid with the wrong type', () => {
        expect(() => addIngredientsStepSchema.validateSync({ ...fields, type: 'action' })).toThrow()
    })
}
