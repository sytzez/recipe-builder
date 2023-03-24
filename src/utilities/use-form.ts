import { createStore } from "solid-js/store";

export const useForm = <Fields extends object>(
    initialFields: Fields,
    validationCallback: (Fields) => boolean,
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

        if (! validationCallback(fields)) {
            return
        }

        submitCallback(fields)
    }

    return [setField, onSubmit]
}
