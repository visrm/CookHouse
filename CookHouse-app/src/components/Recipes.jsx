import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import RecipesCard from "./RecipeCard";
import useGetAllRecipes from "../components/Hooks/useGetAllRecipes";
import { useEffect } from "react";

const Recipes = ({ refreshVar }) => {
  // using getHook for loadingRecipe all posts.
  useGetAllRecipes("", refreshVar);

  //   const dispatch = useDispatch()
  const { loadingRecipe, allRecipes } = useSelector((store) => store.recipes);

  return (
    <>
      <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4">
        {loadingRecipe && (
          <div className="block text-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {!loadingRecipe && allRecipes.length === 0 && (
          <div className="block text-center text-sm p-2 sm:p-4">
            No recipes found.
          </div>
        )}
        {!loadingRecipe &&
          allRecipes.length > 0 &&
          allRecipes.map((recipe) => {
            return <RecipesCard recipe={recipe} key={recipe?._id} />;
          })}
      </div>
    </>
  );
};

export default Recipes;
