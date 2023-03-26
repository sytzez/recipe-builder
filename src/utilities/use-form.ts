import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { ISchema } from "yup";

export const useForm = <Fields extends object>(
    initialFields: Fields,
    schema: ISchema<any>,
    submitCallback: (Fields) => void,
): [
    Store<Fields>,
    (string) => (Event) => void,
    (SubmitEvent) => void,
    SetStoreFunction<Fields>,
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
            alert(e) // TODO: display
            console.error(e)
        }
    }

    return [fields, setField, onSubmit, setFields]
}
