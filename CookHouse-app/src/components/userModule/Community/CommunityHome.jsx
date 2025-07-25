import { useSelector } from "react-redux";
import useGetAllUserCommunities from "../../Hooks/useGetAllUserCommunities";
import { useState } from "react";
import PostCard from "../../PostCard";
import RecipeCard from "../../RecipeCard";
import useGetUsersCommunitiesPosts from "../../Hooks/useGetUsersCommunitiesPosts";
import useGetUsersCommunitiesRecipes from "../../Hooks/useGetUsersCommunitiesRecipes";
import CommunityCard from "../../CommunityCard";
import useGetUsersCommunitiesEvents from "../../Hooks/useGetUsersCommunitiesEvents";
import EventCard from "../../EventCard";
import { MdOutlineRefresh } from "react-icons/md";
import PostSkeleton from "../../Skeleton/PostSkeleton";
import CommunityCardSkeleton from "../../Skeleton/CommunityCardSkeleton";
import RecipeSkeleton from "../../Skeleton/RecipeSkeleton";
import EventSkeleton from "../../Skeleton/EventSkeleton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CommunityHome = () => {
  const [feedType, setFeedType] = useState("communities");
  const [homeRefresh, setHomeRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      yoyo: true,
    });

    tl.from(
      ".animate-class",
      {
        opacity: 0,
        yPercent: 100,
        duration: 1.5,
        ease: "expo.inOut",
        stagger: { amount: 0.06, delay: 1 },
      },
      "+=1"
    ).from(".animate-img", {
      xPercent: 100,
      opacity: 0,
      scale: 0.9,
      ease: "expo.out",
    });
  }, []);

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
                <p className="animate-class text-xs text-amber-500 font-mono font-bold tracking-wide">
                  😊
                </p>
                <hgroup>
                  <h1 className="animate-class sm:text-6xl text-3xl font-semibold">
                    Your Kitchen, Our Community.
                  </h1>
                  <h4 className="animate-class sm:text-4xl text-2xl mb-4 font-semibold text-amber-500">
                    Flavor Shared, Skills Inspired.
                  </h4>
                </hgroup>
                <p className="animate-class sm:py-2 text-xs sm:text-sm font-light tracking-wide w-full items-center">
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
                  className="animate-img h-full w-full"
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
              onClick={() => setFeedType("communities")}
            >
              Your Communities
              {feedType === "communities" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center text-center text-xs sm:text-sm flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
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
                  <div className="block text-center gap-2">
                    {[...Array(3)].map((_, idx) => (
                      <PostSkeleton key={idx} />
                    ))}
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
                  <div className="block text-center gap-2 sm:gap-3">
                    {[...Array(3)].map((_, idx) => (
                      <RecipeSkeleton key={idx} />
                    ))}
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
                  <div className="block text-center gap-2 sm:gap-3">
                    {[...Array(3)].map((_, id) => {
                      return <EventSkeleton key={id} />;
                    })}
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
                  <div className="block text-center gap-0.5">
                    {[...Array(3)].map((_, idx) => (
                      <CommunityCardSkeleton key={idx} />
                    ))}
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
