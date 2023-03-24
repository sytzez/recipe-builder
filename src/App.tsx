import type { Component } from 'solid-js'
import { IngredientForm } from "./components/ingredient-form";
import { IngredientList } from "./components/ingredient-list";
import { createStore } from "solid-js/store";
import { AppState, initialAppState } from "./types/app-state";

const App: Component = () => {
  const [appState, setAppState] = createStore<AppState>(initialAppState)

  return (
      <IngredientList ingredients={[]} />
  )
}

export default App
