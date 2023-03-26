import { Ingredient } from "../schemata/ingredient";
import { Recipe } from "../schemata/recipe";

export interface AppState {
    ingredients: Ingredient[],
    recipes: Recipe[],
}

export const initialAppState = {
    ingredients: [],
    recipes: [],
}
