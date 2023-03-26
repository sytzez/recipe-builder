# Recipe Builder

I started this project to learn SolidJS, TailwindCSS, Yup and Vitest. In the app you can create recipes from ingredients. It can then calculate the cost of the recipe.

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

### Yup schema validation

While I have written pure Javascript schema validation utilities in the past, Yup is a framework dedicated to making this easier and cleaner.

### In-source testing

Unit testing in-source using Vitest, meaning the tests are in the same file as the actual code.
