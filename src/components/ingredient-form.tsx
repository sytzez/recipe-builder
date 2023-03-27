import { Component, createSignal, Show } from "solid-js";
// import { Ingredient } from "../types/ingredient";
import { UnitType } from "../schemata/unit-type";
import { Cost } from "../types/cost";
import { useForm } from "../utilities/use-form";
import { TextInput } from "./form/text-input";
import { ingredientSchema } from "../schemata/ingredient";
import { ValidationError } from "yup";
import { SubmitButton } from "./form/submit-button";
import { CancelButton } from "./form/cancel-button";
import { ValidationErrors } from "./form/validation-errors";

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

    const { setField, onSubmit, validationError } = useForm<Fields>({ ...initialFields }, ingredientSchema, props.onSubmit)

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
                <SubmitButton label={props.submitLabel} />
                <CancelButton onClick={props.onCancel} />
            </div>
            <ValidationErrors error={validationError()} />
        </form>
    )
}
