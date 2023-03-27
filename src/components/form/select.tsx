import { For } from "solid-js";

export const Select = (props) => {
  return (
    <div class="mb-4">
      <label class="mb-2 block font-bold text-gray-700" for={props.name}>
        {props.label}
      </label>
      <select
        id={props.name}
        onChange={props.onChange}
        class="w-full rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-black focus:outline-none"
        required={props.required}
      >
        <For each={props.options}>
          {(option) => (
            <option value={option.value} selected={props.initialValue == option.value}>{option.label}</option>
          )}
        </For>
      </select>
    </div>
  )
}
