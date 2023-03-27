import { createStore, SetStoreFunction, Store } from 'solid-js/store'
import { ISchema, ValidationError } from 'yup'
import { createSignal } from 'solid-js'

export const useForm = <Fields extends object>(
  initialFields: Fields,
  schema: ISchema<any>,
  submitCallback: (f: Fields) => void,
) => {
  const [fields, setFields] = createStore<Fields>(initialFields)
  const [validationError, setValidationError] =
    createSignal<ValidationError | null>(null)

  return {
    fields,
    setFields,
    setFieldUsingEvent: (fieldName: keyof Fields) => (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement

      // @ts-ignore This should work because fieldName is a key of Fields
      setFields(fieldName, inputElement.value)
    },
    onSubmit: async (event: SubmitEvent) => {
      event.preventDefault()
      try {
        submitCallback(await schema.validate(fields))
      } catch (e) {
        setValidationError(e)
      }
    },
    validationError,
  }
}
