import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityPosts,
  setFetching,
  setLoading,
} from "../redux/slices/post.slice.js";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import PostCard from "./PostCard";
import toast from "react-hot-toast";
import { POSTS_API_END_POINT } from "../utils/constants.js";

const CommunityPosts = ({ communityId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchCommunityPosts() {
      try {
        dispatch(setLoading(true));
        dispatch(setFetching(true));
        const response = await axios.get(
          `${POSTS_API_END_POINT}/community/${communityId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setCommunityPosts(response.data.posts));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setFetching(false));
        dispatch(setLoading(false));
      }
    })();
  }, []);

  const { fetching, communityPosts } = useSelector((store) => store.posts);

  return (
    <>
      {fetching && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {!fetching && communityPosts.length === 0 && (
        <div className="block text-center text-sm p-2 sm:p-4">
          No community feeds found.
        </div>
      )}
      {!fetching &&
        communityPosts.length !== 0 &&
        communityPosts.map((post) => {
          return <PostCard post={post} key={post?._id} />;
        })}
    </>
  );
};

export default CommunityPosts;
