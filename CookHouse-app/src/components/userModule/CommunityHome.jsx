import { useSelector } from "react-redux";
import useGetAllUserCommunities from "../Hooks/useGetAllUserCommunities";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import PostCard from "../PostCard";
import RecipeCard from "../RecipeCard";
import useGetUsersCommunitiesPosts from "../Hooks/useGetUsersCommunitiesPosts";
import useGetUsersCommunitiesRecipes from "../Hooks/useGetUsersCommunitiesRecipes";
import CommunityCard from "../CommunityCard";

const CommunityHome = () => {
  const [feedType, setFeedType] = useState("posts");

  useGetAllUserCommunities();
  useGetUsersCommunitiesPosts();
  useGetUsersCommunitiesRecipes();

  const { loadingCommunity, allUserCommunities } = useSelector(
    (store) => store.communities
  );
  const { fetching, usersCommunitiesPosts } = useSelector(
    (store) => store.posts
  );
  const { loading, usersCommunitiesRecipes } = useSelector(
    (store) => store.recipes
  );

  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden">
        <section>
          <div className="sticky top-0 flex w-full font-semibold bg-[#ffffff] z-50 shadow-md">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}
            >
              Posts
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
              onClick={() => setFeedType("communities")}
            >
              Your Communities
              {feedType === "communities" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
          </div>
          <div className="flex w-full mt-2 justify-center">
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {fetching && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!fetching && usersCommunitiesPosts?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No community feeds found.
                  </div>
                )}
                {!fetching &&
                  usersCommunitiesPosts?.length > 0 &&
                  usersCommunitiesPosts.map((feed) => {
                    return <PostCard post={feed} key={feed._id} />;
                  })}
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loading && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loading && usersCommunitiesRecipes?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No community recipes found.
                  </div>
                )}
                {!loading &&
                  usersCommunitiesRecipes.length > 0 &&
                  usersCommunitiesPosts.map((recipe) => {
                    return <RecipeCard recipe={recipe} key={recipe._id} />;
                  })}
              </div>
            )}
            {feedType === "communities" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loadingCommunity && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingCommunity && allUserCommunities?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No communities joined or owned.
                  </div>
                )}
                {!loadingCommunity &&
                  allUserCommunities?.length > 0 &&
                  allUserCommunities.map((community) => {
                    return (
                      <div className="w-full" key={community?._id}>
                        <CommunityCard community={community} />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default CommunityHome;
