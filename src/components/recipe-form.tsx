// import { Recipe } from "../types/recipe";
import { useForm } from '../utilities/use-form'
import { TextInput } from './form/text-input'
import { recipeSchema } from '../schemata/recipe'
import { createSignal, Index, Show } from 'solid-js'
import { Button } from './elements/button'
import { RecipeStepForm } from './recipe-step-form'
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationError } from 'yup'
import { ValidationErrors } from './form/validation-errors'
// import { RecipeStep } from "../schemata/recipe-step";

export interface RecipeFormProps {
  recipe: Recipe | null
  title: string
  submitLabel: string
  onSubmit: (Recipe) => void
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
  const initialFields = props.recipe || emptyFields

  const { fields, setField, setFields, onSubmit, validationError } =
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

  return (
    <form onSubmit={onSubmit} class="mb-4 rounded bg-white p-8 shadow-lg">
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{props.title}</h1>
      <TextInput
        name="title"
        label="Title"
        type="text"
        placeholder="Chicken Curry"
        initialValue={initialFields.title}
        onChange={setField('title')}
        required
      />
      <TextInput
        name="description"
        label="Description"
        type="text"
        placeholder="A delicious curry"
        initialValue={initialFields.description}
        onChange={setField('description')}
      />
      <label class="mb-2 block font-bold text-gray-700">Steps</label>
      <div class="bg-width mb-4 rounded p-8 shadow-md">
        <Index
          each={fields.steps}
          fallback={
            <p class="mb-4 italic text-gray-700">No recipe steps yet.</p>
          }
        >
          {(step, index) => (
            <>
              <Show when={editingStepIndex() !== index}>
                <div class="flex items-baseline justify-between">
                  <p class="mr-2 truncate text-gray-800">
                    {step().description}
                  </p>
                  <Show when={editingStepIndex() === null}>
                    <Button
                      label="Edit step"
                      onClick={() => setEditingStepIndex(index)}
                    />
                  </Show>
                </div>
              </Show>
              <Show when={editingStepIndex() === index}>
                <RecipeStepForm
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
            <Button label="Add step" onClick={() => setCreatingStep(true)} />
          }
        >
          <RecipeStepForm
            recipeStep={null}
            onSubmit={createStepAndStopCreating}
            onCancel={() => setCreatingStep(false)}
            submitLabel="Add a step"
          />
        </Show>
      </div>
      <div class="mb-4">
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
