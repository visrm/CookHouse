import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelfRecipes } from "../../redux/slices/user.slice.js";
import { setFetching } from "../../redux/slices/post.slice.js";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";

export const useGetUserRecipes = async (username) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function FetchUserRecipes() {
      try {
        dispatch(setFetching(true));
        const response = await axios.get(
          `${RECIPES_API_END_POINT}/user/${username}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSelfRecipes(response.data.recipes));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setFetching(false));
      }
    })();
  }, []);
};
