import { RecipeStep } from '../schemata/recipe-step'
import { AppState, initialAppState } from '../types/app-state'
import { ActionStep } from '../schemata/action-step'
import { AddIngredientStep } from '../schemata/add-ingredient-step'

export const stepDescription = (step: RecipeStep, app: AppState) => {
  if (step.type === 'action') {
    return step.description
  }

  const ingredient = app.ingredients[step.ingredientId]

  if (!ingredient) {
    return 'Unknown ingredient.'
  }

  return `Add ${step.quantity} ${ingredient.unitType} of ${ingredient.name}.`
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('returns the step description if it is an action step', () => {
    expect(
      stepDescription(
        { type: 'action', description: 'Do a thing.' },
        initialAppState,
      ),
    ).toBe('Do a thing.')
  })

  it('returns "Unknown ingredient" if the ingredient could not be found', () => {
    expect(
      stepDescription(
        { type: 'add-ingredient', ingredientId: 0, quantity: 1.5 },
        initialAppState,
      ),
    ).toBe('Unknown ingredient.')
  })

  it('returns the proper description of a step to add an ingredient', () => {
    expect(
      stepDescription(
        { type: 'add-ingredient', ingredientId: 0, quantity: 1.5 },
        {
          ...initialAppState,
          ingredients: [{ name: 'an ingredient', unitType: 'spoons', cost: 2 }],
        },
      ),
    ).toBe('Add 1.5 spoons of an ingredient.')
  })
}
