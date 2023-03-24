import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";

export interface AppState {
    ingredients: Ingredient[],
    recipes: Recipe[],
}

export const initialAppState = {
    ingredients: [],
    recipes: [],
}