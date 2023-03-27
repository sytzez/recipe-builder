import { Component } from "solid-js";

export interface TextInputProps {
    name: string
    type: string
    placeholder: string
    label: string
    initialValue: string
    onChange: (Event) => void
    required?: boolean
    step?: string
}

export const TextInput: Component = (props: TextInputProps) => {
    return (
        <div class="mb-4">
            <label
                class="block text-gray-700 font-bold mb-2"
                for={props.name}
            >
                {props.label}
            </label>
            <input
                id={props.name}
                type={props.type}
                placeholder={props.placeholder}
                value={props.initialValue}
                onChange={props.onChange}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
                required={props.required}
                step={props.step}
            />
        </div>
    )
}
