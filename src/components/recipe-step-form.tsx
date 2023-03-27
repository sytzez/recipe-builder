import { useForm } from '../utilities/use-form'
import { ActionStep } from '../schemata/action-step'
import { recipeStepSchema } from "../schemata/recipe-step";
import { TextInput } from './form/text-input'
import { createSignal, Show } from "solid-js";
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationError } from 'yup'
import { ValidationErrors } from './form/validation-errors'
import { Select } from "./form/select";

export interface RecipeStepFormProps {
  recipeStep: ActionStep | null
  title: string
  submitLabel: string
  onSubmit: (RecipeStep) => void
  onCancel: () => void
}

const emptyFields = {
  type: 'action',
  description: '',
}

export const RecipeStepForm = (props: RecipeStepFormProps) => {
  const initialFields = props.recipeStep || emptyFields

  const { setFieldUsingEvent, onSubmit, validationError, fields } = useForm(
    { ...initialFields },
    recipeStepSchema,
    props.onSubmit,
  )

  return (
    <form onSubmit={onSubmit} class="mb-4 rounded bg-white p-8 shadow-md">
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{props.title}</h1>
      <Select
        label="Type of step"
        initialValue={initialFields.type}
        onChange={setFieldUsingEvent('type')}
        options={[
          {label: 'Action', value: 'action'},
          {label: 'Add ingredients', value: 'add-ingredients'}
        ]}
      />
      <Show when={fields.type === 'action'}>
        <TextInput
          name="description"
          label="Step description"
          type="text"
          placeholder="Next, we do ..."
          initialValue={initialFields.description}
          onChange={setFieldUsingEvent('description')}
          required
        />
      </Show>
      <Show when={fields.type === 'add-ingredients'}>
        <p>TODO</p>
      </Show>
      <div class="mb-4">
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
