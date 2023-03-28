import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { createEffect } from "solid-js";

export function createLocalStore<T extends object>(
  name: string,
  initialState: T,
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name)

  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : initialState
  )

  createEffect(() => localStorage.setItem(name, JSON.stringify(state)))

  return [state, setState]
}
