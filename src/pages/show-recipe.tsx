import { createEffect, createMemo, createSignal, For, Index, Show } from "solid-js";
import { useApp } from '../stores/app-context'
import { useNavigate, useParams } from '@solidjs/router'
import { stepDescription } from '../functions/step-description'
import { recipeCost } from '../functions/recipe-cost'
import { formatCost } from '../functions/format-cost'
import { Button } from '../components/elements/button'
import { recipeIngredients } from '../functions/recipe-ingredients'
import { BackButton } from "../components/elements/back-button";
import { RecipeForm } from "../components/recipe-form";
import { EditButton } from "../components/elements/edit-button";

export const ShowRecipe = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [app, actions] = useApp()
  const recipe = () => app.recipes[params.id]
  const [isEditing, setEditing] = createSignal(false)

  return (
    <div
      class="mx-auto mt-8 max-w-4xl rounded bg-white p-8 shadow-lg flex"
      classList={{'max-w-8xl': isEditing()}}
    >
      <section class="flex-grow">
        <div class="mb-4">
          <BackButton onClick={() => navigate('/recipe-builder')} />
        </div>
        <Show
          when={recipe()}
          fallback={<p class="italic text-gray-800">Recipe not found.</p>}
        >
          {(recipe) => (
            <>
              <h1 class="mb-4 text-4xl font-bold text-gray-800">
                {recipe.title}
              </h1>
              <p class="mb-4 text-gray-800">{recipe.description}</p>
              <h2 class="mb-2 text-xl font-bold text-gray-800">Ingredients</h2>
              <For
                each={recipeIngredients(recipe, app)}
                fallback={<p class="mb-2 italic text-gray-800">None.</p>}
              >
                {(ingredientQuantity) => (
                  <p class="mb-2 text-gray-800">
                    {ingredientQuantity.quantity}{' '}
                    {ingredientQuantity.ingredient.unitType}
                    {' of '}
                    {ingredientQuantity.ingredient.name}.
                  </p>
                )}
              </For>
              <p class="font-bold text-gray-800">Total cost</p>
              <p class="mb-4 block text-lg font-bold text-gray-800">
                {formatCost(recipeCost(recipe, app))}
              </p>
              <h2 class="mb-2 text-xl font-bold text-gray-800">Instructions</h2>
              <Index
                each={recipe.steps}
                fallback={<p class="italic text-gray-800">None.</p>}
              >
                {(step) => (
                  <>
                    <p class="mb-4 text-gray-800">
                      {stepDescription(step(), app)}
                    </p>
                  </>
                )}
              </Index>
            </>
          )}
        </Show>
      </section>
      <section class="flex-grow-0">
        <Show
          when={isEditing()}
          fallback={<EditButton onClick={() => setEditing(true)} />}
        >
          <div class="w-96">
            <RecipeForm
              recipe={recipe()}
              title="Edit recipe"
              submitLabel="Update recipe"
              onSubmit={(recipe) => {
                actions.updateRecipe(params.id)(recipe)
                setEditing(false)
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        </Show>
      </section>
    </div>
  )
}
