import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { ISchema, ValidationError } from "yup";

export const useForm = <Fields extends object>(
    initialFields: Fields,
    schema: ISchema<any>,
    submitCallback: (f: Fields) => void,
    errorCallback: (err: ValidationError) => void,
) => {
    const [fields, setFields] = createStore<Fields>(initialFields)

    return {
        fields,
        setFields,
        setField: (fieldName: string) => (event: Event) => {
            const inputElement = event.currentTarget as HTMLInputElement

            // @ts-ignore
            setFields({
                [fieldName]: inputElement.value
            })
        },
        onSubmit: async (event: SubmitEvent) => {
            event.preventDefault()
            try {
                submitCallback(await schema.validate(fields))
            } catch (e) {
                errorCallback(e)
            }
        },
    }
}
