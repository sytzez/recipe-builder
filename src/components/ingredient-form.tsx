import { Component, createSignal, Show } from "solid-js";
// import { Ingredient } from "../types/ingredient";
import { UnitType } from "../schemata/unit-type";
import { Cost } from "../types/cost";
import { useForm } from "../utilities/use-form";
import { TextInput } from "./form/text-input";
import { ingredientSchema } from "../schemata/ingredient";
import { ValidationError } from "yup";

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

    const { setField, onSubmit, validationError } = useForm<Fields>({ ...initialFields }, ingredientSchema, props.onSubmit, setError)

    return (
        <form
            onSubmit={onSubmit}
            class="bg-white shadow-md rounded p-8 mb-4"
        >
            <h1 class="font-bold text-2xl text-gray-800 mb-4">{props.title}</h1>
            <TextInput
                name="name"
                label="Name"
                type="text"
                placeholder="Honey"
                initialValue={initialFields.name}
                onChange={setField('name')}
                required
            />
            <TextInput
                name="unitType"
                label="Unit of measurement"
                type="text"
                placeholder="Teaspoon"
                initialValue={initialFields.unitType}
                onChange={setField('unitType')}
                required
            />
            <TextInput
                name="cost"
                label="Cost per unit of measurement"
                type="number"
                placeholder="0.05"
                initialValue={initialFields.cost}
                onChange={setField('cost')}
                required
                step=".01"
            />
            <div class="mb-4">
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
            </div>
            <Show when={validationError()}>
                {(error) => <p class="text-red-600 font-bold">{error.errors.join('. ')}</p>}
            </Show>
        </form>
    )
}
