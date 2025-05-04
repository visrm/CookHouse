import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setFollowingPosts,
  setLoadingPost,
} from "../../redux/slices/post.slice.js";
import { POSTS_API_END_POINT } from "../../utils/constants.js";


const useGetAllFollowingPosts = async (refreshVar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllFollowingPosts() {
      try {
        dispatch(setLoadingPost(true));
        const response = await axios.get(`${POSTS_API_END_POINT}/following`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setFollowingPosts(response.data.feedPosts));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingPost(false));
      }
    })();
  }, [refreshVar]);
};

export default useGetAllFollowingPosts