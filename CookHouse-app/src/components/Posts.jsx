import PostsCard from "./PostCard";
import { useSelector } from "react-redux";
import  useGetAllPosts  from "./Hooks/useGetAllPosts";
import LoadingSpinner from "./LoadingSpinner";

const Posts = () => {
  // using getHook for loadingPost all posts.
  useGetAllPosts();

  //   const dispatch = useDispatch()
  const { loadingPost, allPosts } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      {loadingPost && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
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
          return <PostsCard post={post} key={post?._id}/>;
        })}
    </>
  );
};

export default Posts;
