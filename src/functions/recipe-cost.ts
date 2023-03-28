import { Recipe } from '../schemata/recipe'
import { AppState } from '../types/app-state'
import { Cost, unknownCost } from '../types/cost'
import { stepCost } from './step-cost'

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
