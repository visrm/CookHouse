import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
import {
  setAllRecipes,
  setLoading,
  setFetching,
} from "../../redux/slices/recipe.slice.js";
import toast from "react-hot-toast";

const useGetAllRecipes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllRecipes() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
        const response = await axios.get(`${RECIPES_API_END_POINT}/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllRecipes(response.data.recipes));
        }
      } catch (error) {
        toast.error(error.response.data.message);

      } finally {
        dispatch(setFetching(false));
        dispatch(setLoading(false));
      }
    })();
  }, []);
};

export default useGetAllRecipes;
