import type { Component } from 'solid-js'
import { IngredientForm } from "./components/ingredient-form";

const App: Component = () => {
  return (
      <IngredientForm ingredient={null} onSubmit={console.log} />
  )
}

export default App
