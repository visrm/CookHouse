import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setFollowingRecipes,
  setLoadingRecipe,
} from "../../redux/slices/recipe.slice.js";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";


const useGetAllFollowingRecipes = async () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllFollowingRecipes() {
      try {
        dispatch(setLoadingRecipe(true));
        const response = await axios.get(`${RECIPES_API_END_POINT}/following`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setFollowingRecipes(response.data.feedRecipes));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingRecipe(false));
      }
    })();
  }, []);
};

export default useGetAllFollowingRecipes
