import { useApp } from '../stores/app-context'
import { createSignal, Index, Show } from 'solid-js'
import { Recipe } from '../schemata/recipe'
import { Button } from './elements/button'
import { RecipeForm } from './recipe-form'
import { useNavigate } from '@solidjs/router'
import { recipeCost } from '../functions/recipe-cost'
import { formatCost } from '../functions/format-cost'
import { ViewButton } from './elements/view-button'
import { EditButton } from './elements/edit-button'
import { DeleteButton } from './elements/delete-button'

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
      <div class="mb-4 rounded bg-white px-8 py-6 shadow-lg">
        <div class="mb-4 flex items-baseline justify-between">
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
        <Index
          each={app.recipes}
          fallback={<p class="italic text-gray-800">No recipes yet.</p>}
        >
          {(recipe, id) => (
            <>
              <Show when={editingRecipeId() === id}>
                <RecipeForm
                  title="Edit recipe"
                  recipe={recipe()}
                  onSubmit={updateRecipeAndStopEditing(id)}
                  onCancel={() => setEditingRecipeId(null)}
                  submitLabel="Update recipe"
                />
              </Show>
              <Show when={editingRecipeId() !== id}>
                <div class="mb-2 flex items-center justify-between">
                  <div class="min-w-0">
                    <h3 class="truncate text-lg font-bold text-gray-800">
                      {recipe().title}
                    </h3>
                    <p class="truncate text-gray-800">
                      {formatCost(recipeCost(recipe(), app))}
                      {' • '}
                      {recipe().description}
                    </p>
                  </div>
                  <div class="whitespace-nowrap">
                    <Show when={editingRecipeId() === null}>
                      <ViewButton
                        onClick={() =>
                          navigate(`/recipes/${id}`)
                        }
                      />
                      <EditButton onClick={() => setEditingRecipeId(id)} />
                      <DeleteButton onClick={() => actions.deleteRecipe(id)} />
                    </Show>
                  </div>
                </div>
              </Show>
            </>
          )}
        </Index>
        <Show when={app.recipes.length === 0}>
          <div class="mt-4">
            <Button
              label="Load demo data"
              onClick={() => actions.loadDemoData()}
            />
          </div>
        </Show>
      </div>
    </>
  )
}
