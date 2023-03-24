import { Component, createSignal } from "solid-js";
import { Ingredient } from "../types/ingredient";
import { UnitType } from "../types/unit-type";
import { Cost } from "../types/cost";
import { useForm } from "../utilities/use-form";

interface Props {
    ingredient: Ingredient | null
    onSubmit: (Ingredient) => void
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

export const IngredientForm: Component = (props: Props) => {
    const initialFields = props.ingredient || emptyFields

    const validationCallback = (fields: Fields) => {
        return true
    }

    const submitCallback = (fields: Fields) => {
        props.onSubmit({
            name: fields.name,
            unitType: fields.unitType,
            cost: parseFloat(fields.cost as string),
        })
    }

    const [setField, onSubmit] = useForm<Fields>(initialFields, validationCallback, submitCallback)

    return (
        <form
            onSubmit={onSubmit}
            class="bg-white shadow-md rounded px-8 py-6 mb-4"
        >
            <div class="mb-4">
                <label
                    class="block text-gray-700 font-bold mb-2"
                    for="name"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Honey"
                    value={initialFields.name}
                    onChange={setField('name')}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 font-bold mb-2"
                    for="name"
                >
                    Unit of measurement
                </label>
                <input
                    id="unitType"
                    type="text"
                    placeholder="Teaspoon"
                    value={initialFields.unitType}
                    onChange={setField('unitType')}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-gray-700 font-bold mb-2"
                    for="name"
                >
                    Cost per unit of measurement
                </label>
                <input
                    id="name"
                    type="number"
                    placeholder="0.05"
                    value={initialFields.cost}
                    onChange={setField('cost')}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <input
                type="submit"
                value="Save"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
        </form>
    )
}
