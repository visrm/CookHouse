import axios from "axios";
import { useEffect } from "react";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";
import {
  setLoadingPost,
  setUsersCommunitiesPosts,
} from "../../redux/slices/post.slice.js";

const useGetUsersCommunitiesPosts = (refreshVar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchUsersCommunitiesPosts() {
      try {
        dispatch(setLoadingPost(true));
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
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingPost(false));
      }
    })();
  }, [refreshVar]);
};

export default useGetUsersCommunitiesPosts;
