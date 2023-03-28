import { RecipeList } from '../components/recipe-list'
import { IngredientList } from '../components/ingredient-list'

export const Home = () => {
  return (
    <>
      <div class="m-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <RecipeList />
        </section>
        <section>
          <IngredientList />
        </section>
      </div>
    </>
  )
}
