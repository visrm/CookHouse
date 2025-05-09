import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setSelfPosts } from "../../redux/slices/user.slice.js";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";

const useGetUserPosts = async (username, refreshVar) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function FetchUserPosts() {
      try {
        dispatch(setLoading(true));
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
        dispatch(setLoading(false));
      }
    })();
  }, [username, refreshVar]);
};

export default useGetUserPosts;
