import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelfPosts } from "../../redux/slices/user.slice.js";
import { setFetching } from "../../redux/slices/post.slice.js";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";

const useGetUserPosts = async (username) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function FetchUserPosts() {
      try {
        dispatch(setFetching(true));
        const response = await axios.get(
          `${POSTS_API_END_POINT}/user/${username}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSelfPosts(response.data.posts));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setFetching(false));
      }
    })();
  }, []);
};

export default useGetUserPosts