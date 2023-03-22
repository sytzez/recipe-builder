import { Component, createSignal } from "solid-js";
import { Ingredient } from "../types/ingredient";

export const IngredientForm: Component = (ingredient: Ingredient | null) => {
    const [name, setName] = createSignal(ingredient?.name || '')
    const [unitType, setUnitType] = createSignal(ingredient?.unitType || 'units')
    const [cost, setCost] = createSignal(ingredient?.cost || 0)

    return (
        <div>
            <input
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
            />
        </div>
    )
}
