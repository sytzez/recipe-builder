import { Component } from "solid-js";
import { Ingredient } from "../types/ingredient";
import { createStore } from "solid-js/store";

interface Store {
    ingredient: Ingredient,
    editingIngredient: Ingredient | null,
}

export const IngredientComponent: Component = () => {
    const [state, setState] = createStore<Store>({
        ingredient: {
            name: '',
            cost: 0,
            unitType: 'units',
        },
        editingIngredient: null,
    })

    const { ingredient, editingIngredient } = state

    if (editingIngredient) {
        const { name, cost, unitType } = editingIngredient

        return (
            <div>
                <label>name</label>
                <input value={name} />

                <label>cost</label>
                <input value={cost} />
            </div>
        )
    }

    const { name, cost, unitType } = ingredient

    return (
        <div>
            <h3>{name}</h3>
            <p>{cost} per {unitType}</p>
            <button>Edit</button>
        </div>
    )
}
