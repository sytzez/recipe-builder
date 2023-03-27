import { Show } from 'solid-js'

export const ValidationErrors = (props) => (
  <Show when={props.error}>
    {(error) => <p class="font-bold text-red-600">{error.errors.join('. ')}</p>}
  </Show>
)
