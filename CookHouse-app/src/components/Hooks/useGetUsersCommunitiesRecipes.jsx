import axios from "axios";
import { useEffect } from "react";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";
import {
  setLoading,
  setFetching,
  setUsersCommunitiesRecipes,
} from "../../redux/slices/recipe.slice.js";
import toast from "react-hot-toast";

const useGetUsersCommunitiesRecipes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchUsersCommunitiesRecipes() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
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
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
        dispatch(setFetching(false));
      }
    })();
  }, []);
};

export default useGetUsersCommunitiesRecipes;
