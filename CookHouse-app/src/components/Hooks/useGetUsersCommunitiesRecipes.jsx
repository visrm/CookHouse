import axios from "axios";
import { useEffect } from "react";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";
import {
  setLoadingRecipe,
  setUsersCommunitiesRecipes,
} from "../../redux/slices/recipe.slice.js";

const useGetUsersCommunitiesRecipes = (refreshVar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchUsersCommunitiesRecipes() {
      try {
        dispatch(setLoadingRecipe(true));
        const response = await axios.get(
          `${RECIPES_API_END_POINT}/communities/user`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setUsersCommunitiesRecipes(response.data.recipes));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingRecipe(false));
      }
    })();
  }, [refreshVar]);
};

export default useGetUsersCommunitiesRecipes;
