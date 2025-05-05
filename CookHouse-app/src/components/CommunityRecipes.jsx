import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityRecipes,
  setLoadingRecipe,
} from "../redux/slices/recipe.slice.js";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import RecipeCard from "./RecipeCard";
import toast from "react-hot-toast";
import { RECIPES_API_END_POINT } from "../utils/constants.js";

const CommunityRecipes = ({ communityId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchCommunityRecipes() {
      try {
        dispatch(setLoadingRecipe(true));
        const response = await axios.get(
          `${RECIPES_API_END_POINT}/community/${communityId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setCommunityRecipes(response.data.recipes));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingRecipe(false));
      }
    })();
  }, [communityId]);

  const { loadingRecipe, communityRecipes } = useSelector(
    (store) => store.recipes
  );

  return (
    <>
      <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4">
        {loadingRecipe && (
          <div className="block text-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {!loadingRecipe && communityRecipes.length === 0 && (
          <div className="block text-center text-sm p-2 sm:p-4">
            No community recipes found.
          </div>
        )}
        {!loadingRecipe &&
          communityRecipes.length > 0 &&
          communityRecipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe?._id} />;
          })}
      </div>
    </>
  );
};

export default CommunityRecipes;
