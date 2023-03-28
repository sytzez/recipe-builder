import { createEffect, createMemo, Index, Show } from "solid-js";
import { useApp } from "../stores/app-context";
import { useParams } from "@solidjs/router";
import { stepDescription } from "../functions/step-description";
import { recipeCost } from "../functions/recipe-cost";
import { formatCost } from "../functions/format-cost";

export const ShowRecipe = () => {
  const params = useParams()
  const [app] = useApp()
  const recipe = () => app.recipes[params.id]

  createEffect(() => {
    console.log(params)
    console.log(app)
    console.log(recipe())
  })

  return (
    <div class="p-8 mx-auto mt-8 max-w-4xl rounded bg-white shadow-lg">
      <Show when={recipe()} fallback={<p class="italic text-gray-800">Recipe not found.</p>}>
        {(recipe) => <>
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p class="text-gray-800 mb-4">
            {recipe.description}
          </p>
          <p class="text-gray-800 font-bold">
            Total cost of ingredients
          </p>
          <p class="mb-4 block text-lg font-bold text-gray-800">
            {formatCost(recipeCost(recipe, app))}
          </p>
          <h2 class="text-xl font-bold text-gray-800 mb-2">
            Instructions
          </h2>
          <Index each={recipe.steps}>
            {(step) => <>
              <p class="text-gray-800 mb-4">
                {stepDescription(step(), app)}
              </p>
            </>}
          </Index>
        </>}
      </Show>
    </div>
  )
}
