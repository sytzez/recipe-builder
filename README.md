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

### Yup schema validation

While I have written pure Javascript schema validation utilities in the past, Yup is a framework dedicated to making this easier and cleaner.
