import { RecipeStep } from '../schemata/recipe-step'
import { AppState, initialAppState } from '../types/app-state'
import { noCost, unknownCost } from '../types/cost'

export const stepCost = (step: RecipeStep, app: AppState) => {
  if (step.type === 'action') {
    return noCost
  }

  const ingredient = app.ingredients[step.ingredientId]

  if (!ingredient) {
    return unknownCost
  }

  return step.quantity * ingredient.cost
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('returns no cost on an action step', () => {
    expect(
      stepCost(
        { type: 'action', description: 'Do something' },
        initialAppState,
      ),
    ).toEqual(noCost)
  })

  it('returns an unknown cost when the ingredient could not be found', () => {
    expect(
      stepCost(
        { type: 'add-ingredient', ingredientId: 0, quantity: 3 },
        initialAppState,
      ),
    ).toEqual(unknownCost)
  })

  it('returns the cost of the ingredient multiplied by the quantity', () => {
    expect(
      stepCost(
        { type: 'add-ingredient', ingredientId: 0, quantity: 1.5 },
        {
          ...initialAppState,
          ingredients: [{ name: 'An ingredient', unitType: 'units', cost: 2 }],
        },
      ),
    ).toEqual(3)
  })
}
