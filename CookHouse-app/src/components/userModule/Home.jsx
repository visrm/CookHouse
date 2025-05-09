import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePostAndRecipe from "../CreatePostAndRecipe.jsx";
import Posts from "../Posts";
import LoadingSpinner from "../LoadingSpinner";
import PostsCard from "../PostCard.jsx";
import Recipes from "../Recipes.jsx";
import useGetAllFollowingPosts from "../Hooks/useGetAllFollowingPosts.jsx";
import { MdOutlineRefresh } from "react-icons/md";
import HomeCarousel from "../HomeCarousel.jsx";
import useGetMe from "../Hooks/useGetMe.jsx";

const Home = () => {
  const [feedType, setFeedType] = useState("posts");
  const [homeRefresh, setHomeRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  useGetAllFollowingPosts(homeRefresh);
  useGetMe(homeRefresh)

  const { loadingPost, followingPosts } = useSelector((store) => store.posts);

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setHomeRefresh({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const refreshAnimate = isRefreshing ? "loading loading-md" : "";

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="relative block w-full max-w-full mx-auto h-60">
          <HomeCarousel />
        </div>

        <div className="pt-2 pb-4 z-[150]">
          <CreatePostAndRecipe />
        </div>

        <section>
          <div className="sticky top-12 md:top-15 flex w-full font-semibold mt-2 z-[100] shadow-md">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}
            >
              For you
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}
            >
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("following")}
            >
              Following
              {feedType === "following" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div className="flex justify-end transition duration-300 relative cursor-pointer">
              <div
                className="bg-[#fafafa] my-auto tooltip tooltip-left"
                data-tip="Refresh"
              >
                <button
                  className="flex items-center rounded-full w-fit hover:text-indigo-600 p-1.5 sm:mr-2"
                  onClick={handleRefresh}
                >
                  <MdOutlineRefresh
                    className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full mt-2 sm:mt-3 justify-center min-h-screen">
            {feedType === "following" && (
              <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 min-h-full w-full max-w-full">
                {loadingPost && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingPost && followingPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No following feeds found.
                  </div>
                )}
                {!loadingPost &&
                  followingPosts.length > 0 &&
                  followingPosts.map((feed) => {
                    return <PostsCard post={feed} key={feed?._id} />;
                  })}
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap py-2 min-h-full w-full max-w-full">
                <Recipes refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap py-2 min-h-full w-full max-w-full">
                <Posts refreshVar={homeRefresh} />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
