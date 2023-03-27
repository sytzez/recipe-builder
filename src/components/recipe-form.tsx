// import { Recipe } from "../types/recipe";
import { useForm } from "../utilities/use-form";
import { TextInput } from "./form/text-input";
import { recipeSchema } from "../schemata/recipe";
import { createSignal, Index, Show } from "solid-js";
import { Button } from "./elements/button";
import { RecipeStepForm } from "./recipe-step-form";
// import { RecipeStep } from "../schemata/recipe-step";

export interface RecipeFormProps {
    recipe: Recipe | null
    title: string
    submitLabel: string
    onSubmit: (Recipe) => void
    onCancel: () => void
}

interface Fields {
    title: string,
    description: string,
    steps: any[],
}

const emptyFields = {
    title: '',
    description: '',
    steps: [],
}

export const RecipeForm = (props: RecipeFormProps) => {
    const initialFields = props.recipe || emptyFields

    const onError = (error) => {
        console.log(error)
    }

    const { fields, setField, setFields, onSubmit, validationError } = useForm<Fields>({ ...initialFields }, recipeSchema, props.onSubmit, onError)
    const [editingStepIndex, setEditingStepIndex] = createSignal<number | null>(null)
    const [isCreatingStep, setCreatingStep] = createSignal(false)

    const createStepAndStopCreating = (step: RecipeStep) => {
        setFields('steps', (steps) => [ ...steps, step ])
        setCreatingStep(false)
    }

    return (
        <form
            onSubmit={onSubmit}
            class="bg-white shadow-lg rounded p-8 mb-4"
        >
            <h1 class="font-bold text-2xl text-gray-800 mb-4">{props.title}</h1>
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
            <label class="block text-gray-700 font-bold mb-2">Steps</label>
            <div class="bg-width shadow-md rounded p-8 mb-4">
                <Index
                    each={fields.steps}
                    fallback={<p class="italic text-gray-700 mb-4">No recipe steps yet.</p>}
                >
                    {(step, index) => (
                        <>
                            <p>{step().description}</p>
                        </>
                    )}
                </Index>
                <Show
                    when={isCreatingStep()}
                    fallback={<Button label="Add step" onClick={() => setCreatingStep(true)} />}
                >
                    <RecipeStepForm
                        recipeStep={null}
                        onSubmit={createStepAndStopCreating}
                        onCancel={() => setCreatingStep(false)}
                        submitLabel="Add step"
                    />
                </Show>
            </div>
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
            <Show when={validationError()}>
                {(error) => <p class="text-red-600 font-bold">{error.errors.join('. ')}</p>}
            </Show>
        </form>
    )
}
