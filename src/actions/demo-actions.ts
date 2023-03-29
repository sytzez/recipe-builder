import { SetStoreFunction, Store } from 'solid-js/store'
import { AppState } from '../stores/app'

export type DemoActions = ReturnType<typeof createDemoActions>

export const createDemoActions = (
  appState: Store<AppState>,
  setAppState: SetStoreFunction<AppState>,
) => {
  return {
    loadDemoData: () => setAppState(demoAppState),
  }
}

export const demoAppState: AppState = {
  ingredients: [
    {
      name: 'Chicken breast',
      unitType: 'grams',
      cost: 0.03,
    },
    {
      name: 'Shrimp',
      unitType: 'grams',
      cost: 0.01,
    },
    {
      name: 'Cauliflower',
      unitType: 'units',
      cost: 1.5,
    },
    {
      name: 'Kale',
      unitType: 'units',
      cost: 1.0,
    },
    {
      name: 'Bell pepper',
      unitType: 'units',
      cost: 0.5,
    },
    {
      name: 'Olive oil',
      unitType: 'spoons',
      cost: 0.1,
    },
  ],
  recipes: [
    {
      title: 'Sheep Pan Shrimp and Kale',
      description:
        'This Sheet Pan Garlic Shrimp and Kale recipe only takes 10 minutes to cook and is loaded with delicious garlicky flavour.',
      steps: [
        {
          type: 'action',
          description:
            'Line a large sheet pan with parchment paper and pre-heat the oven to 425F.',
        },
        {
          type: 'add-ingredient',
          ingredientId: 5,
          quantity: 3,
        },
        {
          type: 'add-ingredient',
          ingredientId: 1,
          quantity: 500,
        },
        {
          type: 'action',
          description: 'Roast shrimp for about 6 minutes, until pink.',
        },
        {
          type: 'add-ingredient',
          ingredientId: 3,
          quantity: 1,
        },
        {
          type: 'action',
          description:
            'Return to the oven and continue baking for another 5-6 minutes, or until kale is crispy and starting to brown on the edges.',
        },
      ],
    },
    {
      title: 'One Pan Baked Chicken and Cauliflower',
      description: 'This recipe basically cooks itself!',
      steps: [
        {
          type: 'action',
          description: 'Preheat the oven to 350F.',
        },
        {
          type: 'add-ingredient',
          ingredientId: 0,
          quantity: 500,
        },
        {
          type: 'add-ingredient',
          ingredientId: 2,
          quantity: 1,
        },
        {
          type: 'action',
          description:
            'Bake for ~50 minutes, or until chicken is fully cooked.',
        },
      ],
    },
  ],
}
