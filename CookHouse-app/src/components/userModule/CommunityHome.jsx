import { useSelector } from "react-redux";
import useGetAllUserCommunities from "../Hooks/useGetAllUserCommunities";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import PostCard from "../PostCard";
import RecipeCard from "../RecipeCard";
import useGetUsersCommunitiesPosts from "../Hooks/useGetUsersCommunitiesPosts";
import useGetUsersCommunitiesRecipes from "../Hooks/useGetUsersCommunitiesRecipes";
import CommunityCard from "../CommunityCard";
import useGetUsersCommunitiesEvents from "../Hooks/useGetUsersCommunitiesEvents";
import EventCard from "../EventCard";
import { MdOutlineRefresh } from "react-icons/md";

const CommunityHome = () => {
  const [feedType, setFeedType] = useState("posts");
  const [homeRefresh, setHomeRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useGetAllUserCommunities(homeRefresh);
  useGetUsersCommunitiesPosts(homeRefresh);
  useGetUsersCommunitiesRecipes(homeRefresh);
  useGetUsersCommunitiesEvents(homeRefresh);

  const { loadingCommunity, allUserCommunities } = useSelector(
    (store) => store.communities
  );
  const { loadingPost, usersCommunitiesPosts } = useSelector(
    (store) => store.posts
  );
  const { loadingRecipe, usersCommunitiesRecipes } = useSelector(
    (store) => store.recipes
  );
  const { loadingEvent, usersCommunitiesEvents } = useSelector(
    (store) => store.events
  );

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
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden transition-all duration-300">
        <section>
          <article className="relative flex w-full bg-[#fafafa]">
            <div className="p-1 sm:p-2 text-center w-full h-full lg:my-auto">
              <div className="z-50 block h-full w-full text-center">
                <p className="text-xs text-amber-500 font-mono font-bold tracking-wide">
                  😊
                </p>
                <hgroup>
                  <h1 className="sm:text-6xl text-2xl font-semibold">
                    Your Kitchen, Our Community.
                  </h1>
                  <h4 className="sm:text-4xl text-xl mb-4 font-semibold text-amber-500">
                    Flavor Shared, Skills Inspired.
                  </h4>
                </hgroup>
                <p className="sm:py-2 text-xs sm:text-sm font-light tracking-wide w-full items-center">
                  Discover the joy of cooking together. Share your family
                  favorites, explore global flavors, and build lasting culinary
                  connections.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-[50%]">
              <figure className="block w-full h-auto mx-auto">
                <img
                  src={"/assets/community-gathering.png"}
                  alt="bowl img"
                  className="h-full w-full"
                  loading="eager"
                />
              </figure>
            </div>
          </article>
        </section>
        <section>
          <div className="sticky top-0 flex w-full font-semibold bg-[#fafafa] sm:pt-2 z-50 shadow-md">
            <div
              className="flex justify-center text-center text-xs sm:text-sm flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}
            >
              Posts
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center text-center text-xs sm:text-sm flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}
            >
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center text-center text-xs sm:text-sm flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("events")}
            >
              Events
              {feedType === "events" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center text-center text-xs sm:text-sm flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("communities")}
            >
              Your Communities
              {feedType === "communities" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div className="flex justify-self-end transition duration-300 relative cursor-pointer">
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
          <div className="flex w-full h-full mt-2 sm:mt-3 justify-center">
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 min-h-full w-full max-w-full">
                {loadingPost && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingPost && usersCommunitiesPosts?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No community feeds found.
                  </div>
                )}
                {!loadingPost &&
                  usersCommunitiesPosts?.length > 0 &&
                  usersCommunitiesPosts.map((feed) => {
                    return <PostCard post={feed} key={feed._id} />;
                  })}
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 min-h-full w-full max-w-full">
                {loadingRecipe && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingRecipe && usersCommunitiesRecipes?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No community recipes found.
                  </div>
                )}
                {!loadingRecipe &&
                  usersCommunitiesRecipes.length > 0 &&
                  usersCommunitiesRecipes.map((recipe) => {
                    return <RecipeCard recipe={recipe} key={recipe._id} />;
                  })}
              </div>
            )}
            {feedType === "events" && (
              <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 min-h-full w-full max-w-full">
                {loadingEvent && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingEvent && usersCommunitiesEvents?.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No community events found.
                  </div>
                )}
                {!loadingEvent &&
                  usersCommunitiesEvents.length > 0 &&
                  usersCommunitiesEvents.map((event) => {
                    return <EventCard event={event} key={event._id} />;
                  })}
              </div>
            )}
            {feedType === "communities" && (
              <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 min-h-full w-full max-w-full">
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
