import { useForm } from '../utilities/use-form'
import { ActionStep } from '../schemata/action-step'
import { recipeStepSchema } from '../schemata/recipe-step'
import { TextInput } from './form/text-input'
import {
  createEffect,
  createSignal,
  indexArray,
  mapArray,
  Show,
} from 'solid-js'
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationError } from 'yup'
import { ValidationErrors } from './form/validation-errors'
import { Select } from './form/select'
import { useApp } from '../stores/app-context'

export interface RecipeStepFormProps {
  recipeStep: RecipeStep | null
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
  const [app] = useApp()

  const initialFields = props.recipeStep || emptyFields

  const { setFieldUsingEvent, onSubmit, validationError, fields } = useForm(
    { ...initialFields },
    recipeStepSchema,
    props.onSubmit,
  )

  const ingredientOptions = indexArray(
    () => app.ingredients,
    (ingredient, id) => ({
      get label() {
        return ingredient().name
      },
      value: id,
    }),
  )

  return (
    <form
      onSubmit={onSubmit}
      class="mb-4 rounded border border-gray-100 bg-white px-8 py-6 shadow-md"
    >
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{props.title}</h1>
      <Select
        label="Type of step"
        initialValue={initialFields.type}
        onChange={setFieldUsingEvent('type')}
        options={[
          { label: 'Action', value: 'action' },
          { label: 'Add ingredient', value: 'add-ingredient' },
        ]}
      />
      <Show when={fields.type === 'action'}>
        <TextInput
          name="description"
          label="Step description"
          type="text"
          placeholder="Next, we do ..."
          initialValue={
            initialFields.type === 'action' ? initialFields.description : ''
          }
          onChange={setFieldUsingEvent('description')}
          required
        />
      </Show>
      <Show when={fields.type === 'add-ingredient'}>
        <Select
          label="Ingredient"
          initialValue={
            initialFields.type === 'add-ingredient'
              ? initialFields.ingredientId
              : null
          }
          onChange={setFieldUsingEvent('ingredientId')}
          options={[{ label: '', value: null }, ...ingredientOptions()]}
        ></Select>
        <TextInput
          name="quantity"
          label={
            'Quantity' +
            (app.ingredients[fields.ingredientId]
              ? ` (${app.ingredients[fields.ingredientId]?.unitType})`
              : '')
          }
          type="number"
          placeholder="3"
          initialValue={
            initialFields.type === 'add-ingredient'
              ? initialFields.quantity
              : ''
          }
          onChange={setFieldUsingEvent('quantity')}
          required
          step=".01"
        />
      </Show>
      <div>
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
