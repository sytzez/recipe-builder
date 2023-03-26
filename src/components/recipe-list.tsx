import { useApp } from "../stores/app-context";
import { createSignal, Index, Show } from "solid-js";
import { Recipe } from "../schemata/recipe";
import { Button } from "./elements/button";
import { RecipeForm } from "./recipe-form";

export const RecipeList = () => {
    const [app, actions] = useApp()
    const [isCreating, setCreating] = createSignal(false)
    const [editingRecipeId, setEditingRecipeId] = createSignal<number | null>(null)

    const createRecipeAndStopCreating = (recipe: Recipe) => {
        actions.createRecipe(recipe)
        setCreating(false)
    }

    const updateRecipeAndStopEditing = (id: number) => (recipe: Recipe) => {
        actions.updateRecipe(id)(recipe)
        setEditingRecipeId(null)
    }

    return (
        <>
            <Show
                when={isCreating()}
                fallback={<Button label="New Recipe" onClick={() => setCreating(true)} />}
            >
                <RecipeForm
                    recipe={null}
                    onSubmit={createRecipeAndStopCreating}
                    onCancel={() => setCreating(false)}
                    submitLabel="Create Recipe"
                />
            </Show>
            <div class="bg-white shadow-md rounded p-8 my-4">
                <Index each={app.recipes}>
                    {(recipe, id) => (
                        <>
                            <Show when={editingRecipeId() === id}>
                                <RecipeForm
                                    recipe={recipe()}
                                    onSubmit={updateRecipeAndStopEditing(id)}
                                    onCancel={() => setEditingRecipeId(null)}
                                    submitLabel="Update Recipe"
                                />
                            </Show>
                            <Show when={editingRecipeId() !== id}>
                                <h1>{recipe().title}</h1>
                                <p>{recipe().description}</p>
                                <Button label={"View Recipe"}  onClick={() => {}} />
                                <Button label={"Edit Recipe"} onClick={() => setEditingRecipeId(id)} />
                            </Show>
                        </>
                    )}
                </Index>
            </div>
        </>
    )
}
