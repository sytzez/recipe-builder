import { createEffect, createMemo, For, Index, Show } from 'solid-js'
import { useApp } from '../stores/app-context'
import { useNavigate, useParams } from '@solidjs/router'
import { stepDescription } from '../functions/step-description'
import { recipeCost } from '../functions/recipe-cost'
import { formatCost } from '../functions/format-cost'
import { Button } from '../components/elements/button'
import { recipeIngredients } from '../functions/recipe-ingredients'

export const ShowRecipe = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [app] = useApp()
  const recipe = () => app.recipes[params.id]

  createEffect(() => {
    console.log(params)
    console.log(app)
    console.log(recipe())
  })

  return (
    <div class="mx-auto mt-8 max-w-4xl rounded bg-white p-8 shadow-lg">
      <div class="mb-4">
        <Button label="Back" onClick={() => navigate('/recipe-builder')} />
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
              fallback={<p class="italic text-gray-800">None.</p>}
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
    </div>
  )
}
