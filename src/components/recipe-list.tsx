import { useApp } from "../stores/app-context";
import { createSignal, Index, Show } from "solid-js";
import { Recipe } from "../schemata/recipe";
import { Button } from "./elements/button";
import { RecipeForm } from "./recipe-form";
import { useNavigate } from "@solidjs/router";

export const RecipeList = () => {
    const [app, actions] = useApp()
    const navigate = useNavigate()
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
            <div class="flex justify-between">
                <h1 class="font-bold text-2xl text-gray-800 mb-2">Recipes</h1>
                <Show when={!isCreating()}>
                    <Button label="New recipe" onClick={() => setCreating(true)} />
                </Show>
            </div>
            <Show when={isCreating()}>
                <RecipeForm
                    title="New recipe"
                    recipe={null}
                    onSubmit={createRecipeAndStopCreating}
                    onCancel={() => setCreating(false)}
                    submitLabel="Create recipe"
                />
            </Show>
            <div class="bg-white shadow-lg rounded p-8 my-4">
                <Index
                    each={app.recipes}
                    fallback={<p class="italic text-gray-700">No recipes yet.</p>}
                >
                    {(recipe, id) => (
                        <>
                            <Show when={editingRecipeId() === id}>
                                <RecipeForm
                                    title="Edit recipe"
                                    recipe={recipe()}
                                    onSubmit={updateRecipeAndStopEditing(id)}
                                    onCancel={() => setEditingRecipeId(null)}
                                    submitLabel="Update Recipe"
                                />
                            </Show>
                            <Show when={editingRecipeId() !== id}>
                                <h1>{recipe().title}</h1>
                                <p>{recipe().description}</p>
                                <Show when={editingRecipeId() === null}>
                                    <Button label={"View recipe"} onClick={() => navigate(`/recipes/${id}`)} />
                                    <Button label={"Edit recipe"} onClick={() => setEditingRecipeId(id)} />
                                </Show>
                            </Show>
                        </>
                    )}
                </Index>
            </div>
        </>
    )
}
