import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import {
  setAllPosts,
  setLoading,
  setFetching,
} from "../../redux/slices/post.slice.js";
import toast from "react-hot-toast";

const useGetAllPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllPosts() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
        const response = await axios.get(`${POSTS_API_END_POINT}/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllPosts(response.data.posts));
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

export default useGetAllPosts;