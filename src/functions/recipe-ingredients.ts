import { Recipe } from '../schemata/recipe'
import { AddIngredientStep } from '../schemata/add-ingredient-step'
import { Ingredient } from '../schemata/ingredient'
import { AppState, initialAppState } from '../types/app-state'

export interface IngredientQuantity {
  ingredient: Ingredient
  quantity: number
}

export const recipeIngredients = (recipe: Recipe, app: AppState) => {
  const ingredientQuantities: { [id: number]: number } = {}

  recipe.steps
    .filter((step) => step.type === 'add-ingredient')
    .forEach((step: AddIngredientStep) => {
      ingredientQuantities[step.ingredientId] ||= 0
      ingredientQuantities[step.ingredientId] += step.quantity
    })

  return Object.entries(ingredientQuantities).map(
    ([ingredientId, quantity]) => ({
      ingredient: app.ingredients[ingredientId],
      quantity,
    }),
  )
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const recipe: Recipe = {
    title: 'A recipe',
    description: 'This is a recipe',
    steps: [
      { type: 'add-ingredient', ingredientId: 0, quantity: 1 },
      { type: 'add-ingredient', ingredientId: 0, quantity: 2 },
      { type: 'add-ingredient', ingredientId: 1, quantity: 4 },
      { type: 'action', description: 'Do something' },
    ],
  }

  const appState: AppState = {
    ...initialAppState,
    ingredients: [
      { name: 'Ingredient 1', unitType: 'spoons', cost: 1 },
      { name: 'Ingredient 2', unitType: 'spoons', cost: 1 },
    ],
  }

  it('returns a list of all ingredients with the correct quantities', () => {
    const ingredientQuantities = recipeIngredients(recipe, appState)

    expect(ingredientQuantities).toEqual([
      {
        ingredient: { name: 'Ingredient 1', unitType: 'spoons', cost: 1 },
        quantity: 3,
      },
      {
        ingredient: { name: 'Ingredient 2', unitType: 'spoons', cost: 1 },
        quantity: 4,
      },
    ])
  })
}
