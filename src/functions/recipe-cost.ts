import { Recipe } from '../schemata/recipe'
import { Cost, unknownCost } from '../types/cost'
import { stepCost } from './step-cost'
import { AppState, initialAppState } from '../stores/app'

export const recipeCost = (recipe: Recipe, app: AppState) =>
  recipe.steps.reduce<Cost>((accumulator, step) => {
    if (accumulator === unknownCost) {
      return unknownCost
    }

    const cost = stepCost(step, app)

    if (cost === unknownCost) {
      return unknownCost
    } else {
      return accumulator + cost
    }
  }, 0)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const recipe: Recipe = {
    title: 'A recipe',
    description: 'This is a recipe',
    steps: [],
  }

  it('returns an unknown cost if one ingredient could not be found', () => {
    expect(
      recipeCost(
        {
          ...recipe,
          steps: [
            { type: 'add-ingredient', ingredientId: 0, quantity: 3 },
            { type: 'add-ingredient', ingredientId: 1, quantity: 3 },
            { type: 'add-ingredient', ingredientId: 0, quantity: 2 },
          ],
        },
        {
          ...initialAppState,
          ingredients: [
            { name: 'an ingredient', unitType: 'grams', cost: 0.01 },
          ],
        },
      ),
    ).toEqual(unknownCost)
  })

  it('returns a cost of 0 if no ingredients were used', () => {
    expect(
      recipeCost(
        {
          ...recipe,
          steps: [{ type: 'action', description: 'Do a thing' }],
        },
        initialAppState,
      ),
    ).toBe(0)
  })

  it('adds up the cost of all ingredients', () => {
    expect(
      recipeCost(
        {
          ...recipe,
          steps: [
            { type: 'add-ingredient', ingredientId: 0, quantity: 50 },
            { type: 'add-ingredient', ingredientId: 1, quantity: 3 },
            { type: 'add-ingredient', ingredientId: 0, quantity: 25 },
          ],
        },
        {
          ...initialAppState,
          ingredients: [
            { name: 'an ingredient', unitType: 'grams', cost: 0.01 },
            { name: 'another ingredient', unitType: 'units', cost: 0.5 },
          ],
        },
      ),
    ).toBe(2.25)
  })
}
