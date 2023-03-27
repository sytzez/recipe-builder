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
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex flex-shrink-0 items-center">
              <a href="/" class="text-2xl font-bold text-gray-800">
                Recipe Builder
              </a>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-center space-x-4">
                <A href="/" class="text-gray-800 hover:text-gray-900">
                  Home
                </A>
              </div>
            </div>
          </div>
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
