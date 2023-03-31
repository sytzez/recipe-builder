import type { Component } from 'solid-js'
import { Route, Routes } from '@solidjs/router'
import { Home } from './pages/home'
import { ShowRecipe } from './pages/show-recipe'

const App: Component = () => {
  return (
    <>
      <nav class="bg-white shadow">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-around px-8 sm:justify-between">
          <a href="/" class="text-2xl font-bold text-gray-800">
            👩‍🍳 Recipe Builder 👨‍🍳
          </a>
        </div>
      </nav>
      <main class="mx-auto max-w-7xl">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/recipes/:id" component={ShowRecipe} />
        </Routes>
      </main>
    </>
  )
}

export default App
