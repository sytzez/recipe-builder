import { createStore } from "solid-js/store";
import { ObjectSchema } from "yup";

export const useForm = <Fields extends object>(
    initialFields: Fields,
    schema: ObjectSchema,
    submitCallback: (Fields) => void,
): [
    (string) => (Event) => void,
    (SubmitEvent) => void,
] => {
    const [fields, setFields] = createStore<Fields>(initialFields)

    const setField = (fieldName: string) => (event: Event) => {
        const inputElement = event.currentTarget as HTMLInputElement

        // @ts-ignore
        setFields({
            [fieldName]: inputElement.value
        })
    }

    const onSubmit = (event: SubmitEvent) => {
        event.preventDefault()

        try {
            submitCallback(schema.validateSync(fields))
        } catch (e) {
            console.error(e)
        }
    }

    return [setField, onSubmit]
}
