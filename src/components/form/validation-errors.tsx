import { Show } from "solid-js";

export const ValidationErrors = (props) => (
    <Show when={props.error}>
        {(error) => <p class="text-red-600 font-bold">{error.errors.join('. ')}</p>}
    </Show>
)
