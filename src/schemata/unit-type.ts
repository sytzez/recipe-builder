import { string } from 'yup'

export const unitTypeSchema = string<UnitType>().oneOf([
  'units',
  'spoons',
  'grams',
])

export type UnitType = 'units' | 'grams' | 'spoons'

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('can be units', () => {
    expect(unitTypeSchema.validateSync('units')).toBe('units')
  })

  it('can be grams', () => {
    expect(unitTypeSchema.validateSync('grams')).toBe('grams')
  })

  it('can be spoons', () => {
    expect(unitTypeSchema.validateSync('spoons')).toBe('spoons')
  })

  it('can not be something else', () => {
    expect(() => unitTypeSchema.validateSync('something')).toThrow()
  })
}
