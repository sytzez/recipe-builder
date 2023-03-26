import { InferType, object, string } from "yup";

export const actionStepSchema = object({
    type: string().is(['action']).required(),
    description: string().required(),
})

export interface ActionStep extends InferType<typeof actionStepSchema> {}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest

    const fields = { type: 'action', description: 'Do something' }

    it('can be valid', () => {
        expect(actionStepSchema.validateSync(fields)).toEqual(fields)
    })

    it('is invalid with the wrong type', () => {
        expect(() => actionStepSchema.validateSync({ ...fields, type: 'add-ingredients' })).toThrow()
    })

    it('is invalid without a description', () => {
        expect(() => actionStepSchema.validateSync({ ...fields, description: '' })).toThrow()
    })
}
