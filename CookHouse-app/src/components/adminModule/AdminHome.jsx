import { useState } from "react";
import CommunitiesTable from "./CommunitiesTable";
import UsersTable from "./UsersTable";
import EventsTable from "./EventsTable";
import RecipesTable from "./RecipesTable";
import PostsTable from "./PostsTable";
import { MdOutlineRefresh } from "react-icons/md";
import FeedbacksTable from "./FeedbacksTable";

const AdminHome = () => {
  const [feedType, setFeedType] = useState("users");
  const [homeRefresh, setHomeRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-y-auto">
        <section>
          <div className="flex w-full max-w-full font-xs sm:font-base font-medium bg-[#ffffff] z-50 shadow-md">
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("users")}
            >
              Users
              {feedType === "users" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}
            >
              Posts
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}
            >
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("events")}
            >
              Events
              {feedType === "events" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("communities")}
            >
              Communities
              {feedType === "communities" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 px-2 py-1 sm:p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("feedbacks")}
            >
              Feedbacks
              {feedType === "feedbacks" && (
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

          <div className="flex w-full max-w-full mt-2 justify-center">
            {feedType === "users" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <UsersTable refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <PostsTable refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <RecipesTable refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "events" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <EventsTable refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "communities" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <CommunitiesTable refreshVar={homeRefresh} />
              </div>
            )}
            {feedType === "feedbacks" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <FeedbacksTable refreshVar={homeRefresh} />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminHome;
