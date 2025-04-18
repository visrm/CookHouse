import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setFetching,
  setFollowingPosts,
  setLoading,
} from "../../redux/slices/post.slice.js";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";

export const useGetAllFollowingPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllFollowingPosts() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
        const response = await axios.get(`${POSTS_API_END_POINT}/following`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setFollowingPosts(response.data.feedPosts));
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
