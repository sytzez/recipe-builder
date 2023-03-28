import { useApp } from '../stores/app-context'
import { createSignal, Index, Show } from 'solid-js'
import { Recipe } from '../schemata/recipe'
import { Button } from './elements/button'
import { RecipeForm } from './recipe-form'
import { useNavigate } from '@solidjs/router'
import { recipeCost } from '../functions/recipe-cost'

export const RecipeList = () => {
  const [app, actions] = useApp()
  const navigate = useNavigate()
  const [isCreating, setCreating] = createSignal(false)
  const [editingRecipeId, setEditingRecipeId] = createSignal<number | null>(
    null,
  )

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
      <div class="mb-4 flex justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Recipes</h1>
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
      <div class="mb-4 rounded bg-white p-8 shadow-lg">
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
                <div class="mb-2 flex items-center justify-between">
                  <div>
                    <h3 class="truncate text-lg font-bold text-gray-800">
                      {recipe().title} (cost: {recipeCost(recipe(), app)})
                    </h3>
                    <p class="truncate text-gray-800">{recipe().description}</p>
                  </div>
                  <Show when={editingRecipeId() === null}>
                    <div class="flex gap-2">
                      <Button
                        label="View"
                        onClick={() => navigate(`/recipes/${id}`)}
                      />
                      <Button
                        label="Edit"
                        onClick={() => setEditingRecipeId(id)}
                      />
                    </div>
                  </Show>
                </div>
              </Show>
            </>
          )}
        </Index>
      </div>
    </>
  )
}
