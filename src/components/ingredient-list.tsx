import { createSignal, Index, Show } from "solid-js";
import { IngredientForm } from "./ingredient-form";
import { Button } from "./elements/button";
import { useApp } from "../stores/app-context";
import { Ingredient } from "../schemata/ingredient";

export const IngredientList = () => {
    const [app, actions] = useApp()
    const [isCreating, setCreating] = createSignal(false)
    const [editingIngredientId, setEditingIngredientId] = createSignal<number | null>(null)

    const createIngredientAndStopCreating = (ingredient: Ingredient) => {
        actions.createIngredient(ingredient)
        setCreating(false)
    }

    const updateIngredientAndStopEditing = (id: number) => (ingredient: Ingredient) => {
        actions.updateIngredient(id)(ingredient)
        setEditingIngredientId(null)
    }

    return (
        <>
            <div class="flex justify-between mb-4">
                <h1 class="font-bold text-2xl text-gray-800">Ingredients</h1>
                <Show when={!isCreating()}>
                    <Button label="New ingredient" onClick={() => setCreating(true)}/>
                </Show>
            </div>
            <Show when={isCreating()}>
                <IngredientForm
                    title="New ingredient"
                    ingredient={null}
                    onSubmit={createIngredientAndStopCreating}
                    onCancel={() => setCreating(false)}
                    submitLabel="Create Ingredient"
                />
            </Show>
            <div class="bg-white shadow-lg rounded p-8 mb-4">
                <Index
                    each={app.ingredients}
                    fallback={<p class="italic text-gray-700">No ingredients yet.</p>}
                >
                    {(ingredient, id) => (
                        <>
                            <Show when={editingIngredientId() === id}>
                                <IngredientForm
                                    title="Edit ingredient"
                                    ingredient={ingredient()}
                                    onSubmit={updateIngredientAndStopEditing(id)}
                                    onCancel={() => setEditingIngredientId(null)}
                                    submitLabel="Update Ingredient"
                                />
                            </Show>
                            <Show when={editingIngredientId() !== id}>
                                <h1>{ingredient().name}</h1>
                                <p>{ingredient().unitType}</p>
                                <p>{ingredient().cost}</p>
                                <Show when={editingIngredientId() === null}>
                                    <Button label={"Edit Ingredient"} onClick={() => setEditingIngredientId(id)} />
                                </Show>
                            </Show>
                        </>
                    )}
                </Index>
            </div>
        </>
    )
}
