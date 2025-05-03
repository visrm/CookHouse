import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import {
  setAllPosts,
  setLoadingPost,
} from "../../redux/slices/post.slice.js";
import toast from "react-hot-toast";

const useGetAllPosts = (keyword) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllPosts() {
      try {
        dispatch(setLoadingPost(true));
        const response = await axios.get(`${POSTS_API_END_POINT}/all?keyword=${keyword}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllPosts(response.data.posts));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingPost(false));
      }
    })();
  }, [keyword]);
};

export default useGetAllPosts;