import { Component, createSignal } from "solid-js";
// import { Ingredient } from "../types/ingredient";
import { UnitType } from "../types/unit-type";
import { Cost } from "../types/cost";
import { useForm } from "../utilities/use-form";
import { TextInput } from "./form/text-input";

export interface IngredientFormProps {
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

export const IngredientForm: Component = (props: IngredientFormProps) => {
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
            <TextInput
                name="name"
                label="Name"
                type="text"
                placeholder="Honey"
                initialValue={initialFields.name}
                onChange={setField('name')}
            />
            <TextInput
                name="unitType"
                label="Unit of measurement"
                type="text"
                placeholder="Teaspoon"
                initialValue={initialFields.unitType}
                onChange={setField('unitType')}
            />
            <TextInput
                name="cost"
                label="Cost per unit of measurement"
                type="text"
                placeholder="0.05"
                initialValue={initialFields.cost}
                onChange={setField('cost')}
            />
            <input
                type="submit"
                value="Save"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
        </form>
    )
}
