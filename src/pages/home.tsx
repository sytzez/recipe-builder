import { RecipeList } from "../components/recipe-list";
import { IngredientList } from "../components/ingredient-list";

export const Home = () => {
    return <>
        <div class="m-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
                <RecipeList/>
            </section>
            <section>
                <IngredientList/>
            </section>
        </div>
    </>
}
