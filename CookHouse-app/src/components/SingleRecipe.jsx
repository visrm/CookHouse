import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { RECIPES_API_END_POINT } from "../utils/constants.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingRecipe,
  setSingleRecipe,
} from "../redux/slices/recipe.slice.js";
import RecipeSkeleton from "./Skeleton/RecipeSkeleton";
import RecipesCard from "./RecipeCard";

const SingleRecipe = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loadingRecipe, singleRecipe } = useSelector((store) => store.recipes);

  useEffect(() => {
    var recipeId = params.id;
    (async function FetchSingleRecipe() {
      try {
        dispatch(setLoadingRecipe(true));
        const response = await axios.get(
          `${RECIPES_API_END_POINT}/recipe/${recipeId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSingleRecipe(response.data.recipe));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingRecipe(false));
      }
    })();
  }, []);

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4">
          {loadingRecipe && (
            <div className="flex flex-col flex-nowrap text-center gap-2 sm:gap-3">
              {[...Array(1)].map((_, idx) => (
                <RecipeSkeleton key={idx} />
              ))}
            </div>
          )}
          {!loadingRecipe && singleRecipe?.length === 0 && (
            <div className="block text-center text-sm p-2 sm:p-4">
              Recipe NOT found.
            </div>
          )}
          {!loadingRecipe && (
            <div>
              <RecipesCard recipe={singleRecipe} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SingleRecipe;
