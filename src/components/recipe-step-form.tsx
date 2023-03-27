import { useForm } from '../utilities/use-form'
import { ActionStep } from '../schemata/action-step'
import { recipeStepSchema } from '../schemata/recipe-step'
import { TextInput } from './form/text-input'
import { Show } from 'solid-js'
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationError } from 'yup'
import { ValidationErrors } from './form/validation-errors'

export interface RecipeStepFormProps {
  recipeStep: ActionStep | null
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

  const { setField, onSubmit, validationError } = useForm(
    { ...initialFields },
    recipeStepSchema,
    props.onSubmit,
  )

  return (
    <form onSubmit={onSubmit} class="mb-4 rounded bg-white p-8 shadow-md">
      <TextInput
        name="description"
        label="Step description"
        type="text"
        placeholder="Next, we do ..."
        initialValue={initialFields.description}
        onChange={setField('description')}
        required
      />
      <div class="mb-4">
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
