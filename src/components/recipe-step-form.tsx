import { useForm } from "../utilities/use-form";
import { ActionStep } from "../schemata/action-step";
import { recipeStepSchema } from "../schemata/recipe-step";
import { TextInput } from "./form/text-input";

export interface RecipeStepFormProps {
    recipeStep: ActionStep | null,
    submitLabel: string,
    onSubmit: (RecipeStep) => void
    onCancel: () => void
}

const emptyFields = {
    type: 'action',
    description: '',
}

export const RecipeStepForm = (props: RecipeStepFormProps) => {
    const initialFields = props.recipeStep || emptyFields

    const [, setField, onSubmit] = useForm({ ...initialFields }, recipeStepSchema, props.onSubmit)
    
    return (
        <form
            onSubmit={onSubmit}
            class="bg-white shadow-md rounded p-8 mb-4"
        >
            <TextInput
                name="description"
                label="Step description"
                type="text"
                placeholder="Next, we do ..."
                initialValue={initialFields.description}
                onChange={setField('description')}
            />
            <input
                type="submit"
                value={props.submitLabel}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
            />
            <button
                onClick={props.onCancel}
                class="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cancel
            </button>
        </form>
    )
}
