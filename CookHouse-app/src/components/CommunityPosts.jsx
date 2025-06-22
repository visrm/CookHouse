import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityPosts,
  setLoadingPost,
} from "../redux/slices/post.slice.js";
import axios from "axios";
import PostCard from "./PostCard";
import toast from "react-hot-toast";
import { POSTS_API_END_POINT } from "../utils/constants.js";
import PostSkeleton from "./Skeleton/PostSkeleton.jsx";

const CommunityPosts = ({ communityId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchCommunityPosts() {
      try {
        dispatch(setLoadingPost(true));
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
        dispatch(setLoadingPost(false));
      }
    })();
  }, [communityId]);

  const { loadingPost, communityPosts } = useSelector((store) => store.posts);

  return (
    <>
      <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4">
        {loadingPost && (
          <div className="block text-center gap-2">
           { [...Array(3)].map((_, idx) => <PostSkeleton key={idx} />)}
          </div>
        )}
        {!loadingPost && communityPosts.length === 0 && (
          <div className="block text-center text-sm p-2 sm:p-4">
            No community feeds found.
          </div>
        )}
        {!loadingPost &&
          communityPosts.length > 0 &&
          communityPosts.map((post) => {
            return <PostCard post={post} key={post?._id} />;
          })}
      </div>
    </>
  );
};

export default CommunityPosts;
