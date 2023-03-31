# Recipe Builder

I started this project to learn SolidJS, TailwindCSS, Yup and Vitest. In the app you can create recipes from ingredients. It can then calculate the cost of the recipe.

See the app live at https://recipe-builder-chi.vercel.app/.

## Getting Started

After cloning the repository, install npm packages:

```bash
cd recipe-builder
npm install
```

Then serve the app in development mode:

```bash
npm run dev
```

The app should become accessible at `http://localhost:3000`.

## Quick overview of the project

- [/src/actions](/src/actions) - Here are all the actions that can modify the app state. No other code can modify the app state.
- [/src/components](/src/components) - The SolidJS UI components.
- [/src/functions](/src/functions) - Here are some functions that process data from the app state. For example to calculate the cost of something, or to list the ingredients used in a recipe.
- [/src/pages](/src/pages) - The pages available on the app.
- [/src/schemata](/src/schemata) - The Yup schemata used to validate form input. They also form the basis of some of the types used in the app state.
- [/src/stores](/src/stores) - Home of the appState store, which stores the entire state of the app. It also provides a context together with the actions from /src/actions.

## Methods used

These are the methods that I learned about while doing this project.

### Reactivity

SolidJS signals and stores update the DOM reactively, without needing to re-render components.
This is what makes SolidJS outperform most other front-end frameworks.

### Contexts/providers

SolidJS' form of dependency injection, and a way to access the same store from multiple components.
By using a context, a component gets access to the main store and to an 'actions' object containing all possible actions to perform.
This creates a nice separation of concerns.

### TypeScript type inference

In this project I stopped using as many typehints as I used to.
I also made use of TypeScript's `ReturnType` to infer the return type of a function rather than defining the return type myself.
This was very useful for automatically and correctly defining the type of the actions object.

> Example: [recipe-actions.ts](src/actions/recipe-actions.ts)

I used Yup's `InferType` to create types from schemata, for example for Recipe and Ingredient.

### Yup schema validation

While I have written pure Javascript schema validation utilities in the past, Yup is a framework dedicated to making this easier and cleaner.

> Example: [ingredient.ts](src/schemata/ingredient.ts)

### In-source testing

Unit testing in-source using Vitest, meaning the tests are in the same file as the actual code.
This was useful for testing the Yup schemata as well as some functions.

> Example: [recipe-cost.ts](src/functions/recipe-cost.ts)

### Solid router

SolidJS's way to add routes to an app.

### SolidJS indexArray

Used to reactively map an array. I've used this for example to map the array of ingredients from the app store to select boxes where you can select an ingredient.

If an ingredient changes name, or a new ingredient is added, it is automatically updated in the options prop of such a Select component.

> Example: `ingredientOptions` in [recipe-step-form.tsx](src/components/recipe-step-form.tsx)

### Component testing using solid-testing-library and snapshots

To test components, I used solid-testing-library to render components and check their snapshots.
This will flag up any changes to the components.

I tested that the right callbacks are fired by passing on Vitest mock functions to the components, firing the right events, and checking whether the mock functions were called.
I also query some DOM elements on the component to check that they exist and have the right attributes.

> Example: [ingredient-form.spec.tsx](src/components/ingredient-form.spec.tsx)
