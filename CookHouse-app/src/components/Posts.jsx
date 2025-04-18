import PostsCard from "./PostsCard";
import { useSelector } from "react-redux";
import { useGetAllPosts } from "./Hooks/useGetAllPosts";
import LoadingSpinner from "./LoadingSpinner";

const Posts = () => {
  // using getHook for fetching all posts.
  useGetAllPosts();

  //   const dispatch = useDispatch()
  const { fetching, allPosts } = useSelector((store) => store.posts);

  return (
    <>
      {fetching && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {!fetching && allPosts.length === 0 && (
        <div className="block text-center text-sm p-2 sm:p-4">
          No feeds found.
        </div>
      )}
      {!fetching &&
        allPosts.length !== 0 &&
        allPosts.map((post) => {
          return <PostsCard post={post} key={post?._id} />;
        })}
    </>
  );
};

export default Posts;
