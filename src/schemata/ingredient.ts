import { InferType, number, object, string } from "yup";
import { UnitType, unitTypeSchema } from "./unit-type";

export const ingredientSchema = object({
    name: string().required(),
    unitType: unitTypeSchema.required(),
    cost: number().min(0).required(),
})

export interface Ingredient extends InferType<typeof ingredientSchema> {}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest

    const fields = { name: 'Honey', unitType: 'spoons', cost: '0.3' }

    it('can be valid', () => {
        expect(ingredientSchema.validateSync(fields))
            .toEqual({ name: 'Honey', unitType: 'spoons', cost: 0.3 })
    })

    it('is invalid without a name', () => {
        expect(() => ingredientSchema.validateSync({ ...fields, name: '' })).toThrow()
    })

    it('is invalid without a unit type', () => {
        expect(() => ingredientSchema.validateSync({ ...fields, unitType: '' })).toThrow()
    })

    it('is invalid with a wrong unit type', () => {
        expect(() => ingredientSchema.validateSync({ ...fields, unitType: 'unknown' })).toThrow()
    })

    it('is invalid without a cost', () => {
        expect(() => ingredientSchema.validateSync({ ...fields, cost: '' })).toThrow()
    })

    it('is valid with a cost of 0', () => {
        expect(ingredientSchema.validateSync({ ...fields, cost: 0 }))
            .toEqual({ name: 'Honey', unitType: 'spoons', cost: 0 })
    })
}
