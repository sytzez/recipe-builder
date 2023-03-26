// import { Recipe } from "../types/recipe";
import { useForm } from "../utilities/use-form";
import { TextInput } from "./form/text-input";
import { recipeSchema } from "../schemata/recipe";

export interface RecipeFormProps {
    recipe: Recipe | null
    submitLabel: string
    onSubmit: (Recipe) => void
    onCancel: () => void
}

interface Fields {
    title: string,
    description: string,
}

const emptyFields = {
    title: '',
    description: '',
}

export const RecipeForm = (props: RecipeFormProps) => {
    const initialFields = props.recipe || emptyFields

    const submitCallback = (fields: Fields) => {
        props.onSubmit({
            title: fields.title,
            description: fields.description,
            steps: [],
        })
    }

    const [setField, onSubmit] = useForm<Fields>({ ...initialFields }, recipeSchema, submitCallback)

    return (
        <form
            onSubmit={onSubmit}
            class="bg-white shadow-md rounded p-8 mb-4"
        >
            <TextInput
                name="title"
                label="Title"
                type="text"
                placeholder="Chicken Curry"
                initialValue={initialFields.title}
                onChange={setField('title')}
            />
            <TextInput
                name="description"
                label="Description"
                type="text"
                placeholder="A delicious curry"
                initialValue={initialFields.description}
                onChange={setField('description')}
            />
            <input
                type="submit"
                value={props.submitLabel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
            />
            <button
                onClick={props.onCancel}
                className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cancel
            </button>
        </form>
    )
}
