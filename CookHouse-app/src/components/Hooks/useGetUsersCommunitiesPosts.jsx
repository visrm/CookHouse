import axios from "axios";
import { useEffect } from "react";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";
import {
  setLoading,
  setFetching,
  setUsersCommunitiesPosts,
} from "../../redux/slices/post.slice.js";
import toast from "react-hot-toast";

const useGetUsersCommunitiesPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchUsersCommunitiesPosts() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
        const response = await axios.get(
          `${POSTS_API_END_POINT}/communities/user`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setUsersCommunitiesPosts(response.data.posts));
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

export default useGetUsersCommunitiesPosts;
