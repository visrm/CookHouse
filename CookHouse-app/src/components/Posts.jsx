import PostsCard from "./PostCard";
import { useSelector } from "react-redux";
import useGetAllPosts from "./Hooks/useGetAllPosts";
import PostSkeleton from "./Skeleton/PostSkeleton";

const Posts = ({ refreshVar }) => {
  // using getHook for loadingPost all posts.
  useGetAllPosts("", refreshVar);

  //   const dispatch = useDispatch()
  const { loadingPost, allPosts } = useSelector((store) => store.posts);

  return (
    <>
      <div
        id="post-card-id"
        className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2"
      >
        {loadingPost && (
          <div className="block text-center gap-2">
            {[...Array(3)].map((_, idx) => (
              <PostSkeleton key={idx} />
            ))}
          </div>
        )}
        {!loadingPost && allPosts.length === 0 && (
          <div className="block text-center text-sm p-2 sm:p-4">
            No feeds found.
          </div>
        )}
        {!loadingPost &&
          allPosts.length > 0 &&
          allPosts.map((post) => {
            return (
              <PostsCard post={post} key={post?._id} />
            );
          })}
      </div>
    </>
  );
};

export default Posts;
