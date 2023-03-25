import { createSignal, Index, Show } from "solid-js";
import { IngredientForm } from "./ingredient-form";
import { Button } from "./elements/button";
import { useApp } from "../stores/app";

export const IngredientList = (props) => {
    const [app, actions] = useApp()
    const [isCreating, setCreating] = createSignal(false)
    const [editingIngredientId, setEditingIngredientId] = createSignal<number | null>(null)

    return (
        <>
            <Show
                when={isCreating()}
                fallback={<Button label="New Ingredient" onClick={() => setCreating(true)} />}
            >
                <IngredientForm
                    ingredient={null}
                    submitLabel="Create Ingredient"
                    onSubmit={actions.createIngredient}
                    onCancel={() => setCreating(false)}
                ></IngredientForm>
            </Show>
            <div class="bg-white shadow-md rounded p-8 my-4">
                <Index each={app.ingredients}>
                    {(ingredient, id) => (
                        <>
                            <Show when={editingIngredientId() === id}>
                                <IngredientForm
                                    ingredient={ingredient()}
                                    submitLabel="Update Ingredient"
                                    onSubmit={actions.updateIngredient(id)}
                                    onCancel={() => setEditingIngredientId(null)}
                                ></IngredientForm>
                            </Show>
                            <Show when={editingIngredientId() !== id}>
                                <h1>{ingredient().name}</h1>
                                <p>{ingredient().unitType}</p>
                                <p>{ingredient().cost}</p>
                                <Button label={"Edit Ingredient"} onClick={() => setEditingIngredientId(id)} />
                            </Show>
                        </>
                    )}
                </Index>
            </div>
        </>
    )
}
