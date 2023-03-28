import { Component } from 'solid-js'

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
      <label class="mb-2 block font-bold text-gray-800" for={props.name}>
        {props.label}
      </label>
      <input
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.initialValue}
        onChange={props.onChange}
        class="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-800 shadow focus:border-black focus:outline-none"
        required={props.required}
        step={props.step}
      />
    </div>
  )
}
