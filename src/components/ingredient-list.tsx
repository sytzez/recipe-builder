import { Ingredient } from "../types/ingredient";
import { createSignal, For, Show } from "solid-js";
import { IngredientForm } from "./ingredient-form";
import { Entity } from "../types/entity";
import { create } from "../functions/create";
import { Button } from "./elements/button";

export interface IngredientListProps {
    ingredients: Entity<Ingredient>[]
}

export const IngredientList = (props: IngredientListProps) => {
    const [ingredients, setIngredients] = createSignal(props.ingredients)
    const [isCreating, setCreating] = createSignal(false)
    const [editingIngredientId, setEditingIngredientId] = createSignal<number | null>(null)

    const newIngredient = () => setCreating(true)
    const cancelCreatingIngredient = () => setCreating(false)
    const createIngredient = (ingredient: Ingredient) => {
        setIngredients([...ingredients(), create<Ingredient>(ingredient)])
        setCreating(false)
    }
    const updateIngredient = (entity: Entity<Ingredient>) => (newData: Ingredient) => {
        console.log("update ingredient", entity.id)
        entity.setData(newData)
        setEditingIngredientId(null)
    }
    const editIngredient = (entity: Entity<Ingredient>) => () => setEditingIngredientId(entity.id)
    const cancelEditingIngredient = () => setEditingIngredientId(null)
    const isEditingIngredient = (entity: Entity<Ingredient>) => editingIngredientId() == entity.id

    return (
        <>
            <Show
                when={isCreating()}
                fallback={<Button label="New Ingredient" onClick={newIngredient} />}
            >
                <IngredientForm
                    ingredient={null}
                    submitLabel="Create Ingredient"
                    onSubmit={createIngredient}
                    onCancel={cancelCreatingIngredient}
                ></IngredientForm>
            </Show>
            <div class="bg-white shadow-md rounded p-8 my-4">
                <For each={ingredients()}>
                    {(ingredient) => (
                        <>
                            <Show when={isEditingIngredient(ingredient)}>
                                <IngredientForm
                                    ingredient={ingredient.data}
                                    submitLabel="Update Ingredient"
                                    onSubmit={updateIngredient(ingredient)}
                                    onCancel={cancelEditingIngredient}
                                ></IngredientForm>
                            </Show>
                            <Show when={!isEditingIngredient(ingredient)}>
                                <h1>{ingredient.data.name}</h1>
                                <p>{ingredient.data.unitType}</p>
                                <p>{ingredient.data.cost}</p>
                                <Button label={"Edit Ingredient"} onClick={editIngredient(ingredient)} />
                            </Show>
                        </>
                    )}
                </For>
            </div>
        </>
    )
}
