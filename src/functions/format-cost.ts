import { Cost, unknownCost } from '../types/cost'

export const formatCost = (cost: Cost) => {
  if (cost === unknownCost) {
    return 'Unknown cost'
  }

  return `£${cost.toFixed(2)}`
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('returns unknown cost if the cost is unknown', () => {
    expect(formatCost(unknownCost)).toBe('Unknown cost')
  })

  it('formats the cost with two decimals', () => {
    expect(formatCost(1 / 3)).toBe('£0.33')
    expect(formatCost(2)).toBe('£2.00')
  })
}
