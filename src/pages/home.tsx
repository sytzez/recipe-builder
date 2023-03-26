import { RecipeList } from "../components/recipe-list";
import { IngredientList } from "../components/ingredient-list";

export const Home = () => {
    return <>
        <main class="m-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
                <RecipeList/>
            </section>
            <section>
                <h1 class="font-bold text-2xl text-gray-800 mb-2">Ingredients</h1>
                <IngredientList/>
            </section>
        </main>
    </>
}
