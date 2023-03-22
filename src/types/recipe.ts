import { RecipeStep } from './recipe-step'

export interface Recipe {
    title: string
    description: string
    steps: RecipeStep[]
}
