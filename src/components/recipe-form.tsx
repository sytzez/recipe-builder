import { useForm } from '../utilities/use-form'
import { TextInput } from './form/text-input'
import { Recipe, recipeSchema } from "../schemata/recipe";
import { createEffect, createSignal, Index, Show } from "solid-js";
import { Button } from './elements/button'
import { RecipeStepForm } from './recipe-step-form'
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationError } from 'yup'
import { ValidationErrors } from './form/validation-errors'
import { useApp } from '../stores/app-context'
import { stepDescription } from '../functions/step-description'
import { recipeCost } from '../functions/recipe-cost'
import { formatCost } from '../functions/format-cost'
import { RecipeStep } from "../schemata/recipe-step";
import { EditButton } from "./elements/edit-button";

export interface RecipeFormProps {
  recipe: Recipe | null
  title: string
  submitLabel: string
  onSubmit: (recipe: Recipe) => void
  onChange: ((recipe: Recipe) => void) | null
  onCancel: () => void
}

interface Fields {
  title: string
  description: string
  steps: any[]
}

const emptyFields = {
  title: '',
  description: '',
  steps: [],
}

export const RecipeForm = (props: RecipeFormProps) => {
  const [app] = useApp()

  const initialFields = props.recipe || emptyFields

  const { fields, setFieldUsingEvent, setFields, onSubmit, validationError } =
    useForm<Fields>({ ...initialFields }, recipeSchema, props.onSubmit)
  const [editingStepIndex, setEditingStepIndex] = createSignal<number | null>(
    null,
  )
  const [isCreatingStep, setCreatingStep] = createSignal(false)

  const createStepAndStopCreating = (step: RecipeStep) => {
    setFields('steps', (steps) => [...steps, step])
    setCreatingStep(false)
  }

  const updateStepAndStopUpdating = (index: number) => (step: RecipeStep) => {
    setFields('steps', index, step)
    setEditingStepIndex(null)
  }

  createEffect(() => {
    if (props.onChange) {
      props.onChange(fields)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      class="mb-4 rounded border border-gray-100 bg-white px-8 py-6 shadow-lg"
    >
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{props.title}</h1>
      <TextInput
        name="title"
        label="Title"
        type="text"
        placeholder="Chicken Curry"
        initialValue={initialFields.title}
        onChange={setFieldUsingEvent('title')}
        required
      />
      <TextInput
        name="description"
        label="Description"
        type="text"
        placeholder="A delicious curry"
        initialValue={initialFields.description}
        onChange={setFieldUsingEvent('description')}
      />
      <label class="mb-2 block font-bold text-gray-800">Steps</label>
      <div class="bg-width mb-4 rounded px-8 py-6 shadow-md">
        <Index
          each={fields.steps}
          fallback={
            <p class="mb-4 italic text-gray-800">No recipe steps yet.</p>
          }
        >
          {(step, index) => (
            <>
              <Show when={editingStepIndex() !== index}>
                <div class="mb-2 flex items-center justify-between">
                  <p class="mr-2 truncate text-gray-800">
                    {stepDescription(step(), app)}
                  </p>
                  <Show when={editingStepIndex() === null}>
                    <EditButton
                      onClick={() => setEditingStepIndex(index)}
                    />
                  </Show>
                </div>
              </Show>
              <Show when={editingStepIndex() === index}>
                <RecipeStepForm
                  title="Edit step"
                  recipeStep={step()}
                  submitLabel="Update step"
                  onSubmit={updateStepAndStopUpdating(index)}
                  onCancel={() => setEditingStepIndex(null)}
                />
              </Show>
            </>
          )}
        </Index>
        <Show
          when={isCreatingStep()}
          fallback={
            <Button label="Add a step" onClick={() => setCreatingStep(true)} />
          }
        >
          <RecipeStepForm
            title="New step"
            recipeStep={null}
            onSubmit={createStepAndStopCreating}
            onCancel={() => setCreatingStep(false)}
            submitLabel="Add step"
          />
        </Show>
      </div>
      <label class="mb-2 block font-bold text-gray-800">Total cost</label>
      <p class="mb-4 block text-lg font-bold text-gray-800">
        {formatCost(recipeCost(fields, app))}
      </p>
      <div>
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
