import { Component, createSignal, Show } from 'solid-js'
// import { Ingredient } from "../types/ingredient";
import { UnitType, unitTypes } from "../schemata/unit-type";
import { Cost } from '../types/cost'
import { useForm } from '../utilities/use-form'
import { TextInput } from './form/text-input'
import { ingredientSchema } from '../schemata/ingredient'
import { ValidationError } from 'yup'
import { SubmitButton } from './form/submit-button'
import { CancelButton } from './form/cancel-button'
import { ValidationErrors } from './form/validation-errors'
import { Select } from "./form/select";

export interface IngredientFormProps {
  ingredient: Ingredient | null
  title: string
  submitLabel: string
  onSubmit: (Ingredient) => void
  onCancel: () => void
}

interface Fields {
  name: string
  unitType: UnitType | ''
  cost: Cost | ''
}

const emptyFields: Fields = {
  name: '',
  unitType: '',
  cost: '',
}

export const IngredientForm: Component = (props: IngredientFormProps) => {
  const initialFields = props.ingredient || emptyFields

  const { setFieldUsingEvent, onSubmit, validationError } = useForm<Fields>(
    { ...initialFields },
    ingredientSchema,
    props.onSubmit,
  )

  return (
    <form
      onSubmit={onSubmit}
      class="mb-4 rounded border border-gray-100 bg-white p-8 shadow-md"
    >
      <h1 class="mb-4 text-2xl font-bold text-gray-800">{props.title}</h1>
      <TextInput
        name="name"
        label="Name"
        type="text"
        placeholder="Honey"
        initialValue={initialFields.name}
        onChange={setFieldUsingEvent('name')}
        required
      />
      <Select
        label="Unit of measurement"
        initialValue={initialFields.unitType}
        onChange={setFieldUsingEvent('unitType')}
        options={unitTypes.map((type) => ({label: type, value: type}))}
      />
      <TextInput
        name="cost"
        label="Cost per unit of measurement"
        type="number"
        placeholder="0.05"
        initialValue={initialFields.cost}
        onChange={setFieldUsingEvent('cost')}
        required
        step=".01"
      />
      <div class="mb-4">
        <SubmitButton label={props.submitLabel} />
        <CancelButton onClick={props.onCancel} />
      </div>
      <ValidationErrors error={validationError()} />
    </form>
  )
}
