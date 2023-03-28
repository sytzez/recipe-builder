import { createSignal, Index, Show } from 'solid-js'
import { IngredientForm } from './ingredient-form'
import { Button } from './elements/button'
import { useApp } from '../stores/app-context'
import { Ingredient } from '../schemata/ingredient'

export const IngredientList = () => {
  const [app, actions] = useApp()
  const [isCreating, setCreating] = createSignal(false)
  const [editingIngredientId, setEditingIngredientId] = createSignal<
    number | null
  >(null)

  const createIngredientAndStopCreating = (ingredient: Ingredient) => {
    actions.createIngredient(ingredient)
    setCreating(false)
  }

  const updateIngredientAndStopEditing =
    (id: number) => (ingredient: Ingredient) => {
      actions.updateIngredient(id)(ingredient)
      setEditingIngredientId(null)
    }

  return (
    <>
      <div class="mb-4 flex justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Ingredients</h1>
        <Show when={!isCreating()}>
          <Button label="New ingredient" onClick={() => setCreating(true)} />
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
      <div class="mb-4 rounded bg-white p-8 shadow-lg">
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
                <div class="mb-2 flex items-center justify-between">
                  <div>
                    <h3 class="truncate text-lg font-bold text-gray-800">
                      {ingredient().name}
                    </h3>
                    <p class="truncate text-gray-800">
                      {ingredient().cost} per {ingredient().unitType}
                    </p>
                  </div>
                  <Show when={editingIngredientId() === null}>
                    <Button
                      label={'Edit'}
                      onClick={() => setEditingIngredientId(id)}
                    />
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
