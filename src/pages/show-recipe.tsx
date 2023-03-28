import { createEffect, createMemo, Index, Show } from "solid-js";
import { useApp } from "../stores/app-context";
import { useParams } from "@solidjs/router";
import { stepDescription } from "../functions/step-description";

export const ShowRecipe = () => {
  const params = useParams()
  const [app] = useApp()
  const recipe = () => app.ingredients[params.id]

  createEffect(() => {
    console.log(params)
    console.log(app)
    console.log(recipe())
  })

  return (
    <div class="m-8 p-8 rounded bg-white shadow-lg">
      <Show when={recipe()} fallback={<p class="italic text-gray-700">Recipe not found.</p>}>
        {(recipe) => <>
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            {recipe().title}
          </h1>
          <p class="text-gray-800 mb-4">
            {recipe().description}
          </p>
          <Index each={recipe.steps}>
            {(step) => <>
              <p>
                {stepDescription(step(), app)}
              </p>
            </>}
          </Index>
        </>}
      </Show>
    </div>
  )
}
