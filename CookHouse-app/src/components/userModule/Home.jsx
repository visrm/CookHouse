import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../createPost";
import Posts from "../Posts";
import LoadingSpinner from "../LoadingSpinner";
import PostsCard from "../PostsCard";
import { useGetAllFollowingPosts } from "../Hooks/useGetAllFollowingPosts.jsx";

const Home = () => {
  const [feedType, setFeedType] = useState("posts");
  useGetAllFollowingPosts();

  const { fetching, followingPosts } = useSelector((store) => store.posts);

  return (
    <>
      <main className="flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto">
        <CreatePost />
        <section>
          <div className="flex w-full border-b border-gray-800 mt-4">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}>
              Posts
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}>
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("following")}>
              Following
              {feedType === "following" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
              )}
            </div>
          </div>
          <div className="flex w-full mt-2 justify-center">
            {feedType === "following" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {fetching && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!fetching && followingPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No following feeds found.
                  </div>
                )}
                {!fetching &&
                  followingPosts.map((feed) => {
                    return <PostsCard post={feed} key={feed?._id} />;
                  })}
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {fetching && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!fetching && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No recipes found.
                  </div>
                )}
              </div>
            )}
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <Posts />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
