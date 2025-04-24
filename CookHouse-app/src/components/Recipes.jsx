import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import RecipesCard from "./RecipeCard";
import useGetAllRecipes from "../components/Hooks/useGetAllRecipes";

const Recipes = () => {
  // using getHook for fetching all posts.
  useGetAllRecipes();

  //   const dispatch = useDispatch()
  const { fetching, allRecipes } = useSelector((store) => store.recipes);

  return (
    <>
      {fetching && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {!fetching && allRecipes.length === 0 && (
        <div className="block text-center text-sm p-2 sm:p-4">
          No recipes found.
        </div>
      )}
      {!fetching &&
        allRecipes.length > 0 &&
        allRecipes.map((recipe) => {
          return <RecipesCard recipe={recipe} key={recipe?._id} />;
        })}
    </>
  );
};

export default Recipes;
