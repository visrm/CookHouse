import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch, useSelector } from "react-redux";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
import {
  setAllRecipes,
  setLoadingRecipe,
} from "../../redux/slices/recipe.slice.js";
import toast from "react-hot-toast";

const useGetAllRecipes = (keyword, refreshVar) => {
  const dispatch = useDispatch();
  const { searchedRecipeQuery } = useSelector((store) => store.recipes);

  useEffect(() => {
    (async function FetchAllRecipes() {
      try {
        dispatch(setLoadingRecipe(true));
        const response = await axios.get(
          `${RECIPES_API_END_POINT}/all?keyword=${searchedRecipeQuery}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setAllRecipes(response.data.recipes));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingRecipe(false));
      }
    })();
  }, [keyword, refreshVar, searchedRecipeQuery]);
};

export default useGetAllRecipes;
