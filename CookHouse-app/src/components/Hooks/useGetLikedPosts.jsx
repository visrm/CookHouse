import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingPost,
  setLikedPosts,
} from "../../redux/slices/post.slice.js";
import { POSTS_API_END_POINT } from "../../utils/constants.js";

const useGetLikedPosts = async (userId, refreshVar) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function FetchLikedPosts() {
      try {
        dispatch(setLoadingPost(true));
        const res = await axios.get(`${POSTS_API_END_POINT}/likes/${userId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setLikedPosts(res.data.likedPosts));
        }
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        dispatch(setLoadingPost(false));
      }
    })();
  }, [userId, refreshVar]);
};

export default useGetLikedPosts;
