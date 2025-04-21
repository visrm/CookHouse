import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityRecipes,
  setFetching,
  setLoading,
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
        dispatch(setLoading(true));
        dispatch(setFetching(true));
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
        dispatch(setFetching(false));
        dispatch(setLoading(false));
      }
    })();
  }, []);

  const { fetching, communityRecipes } = useSelector((store) => store.recipes);

  return (
    <>
      {fetching && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {!fetching && communityRecipes.length === 0 && (
        <div className="block text-center text-sm p-2 sm:p-4">
          No community recipes found.
        </div>
      )}
      {!fetching &&
        communityRecipes.length !== 0 &&
        communityRecipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe?._id} />;
        })}
    </>
  );
};

export default CommunityRecipes;
