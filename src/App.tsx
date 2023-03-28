import type { Component } from 'solid-js'
import { IngredientForm } from './components/ingredient-form'
import { IngredientList } from './components/ingredient-list'
import { createStore } from 'solid-js/store'
import { AppState, initialAppState } from './types/app-state'
import { AppProvider } from './stores/app-context'
import { RecipeList } from './components/recipe-list'
import { A, Route, Routes } from '@solidjs/router'
import { Home } from './pages/home'

const App: Component = () => {
  return (
    <>
      <nav class="bg-white shadow">
        <div class="mx-auto flex h-16 max-w-7xl items-center px-8">
          <a href="/" class="text-2xl font-bold text-gray-800">
            Recipe Builder
          </a>
        </div>
      </nav>
      <main class="mx-auto max-w-7xl">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/ingredients" component={IngredientList} />
          <Route path="/recipes/:id" component={IngredientList} />
        </Routes>
      </main>
    </>
  )
}

export default App
