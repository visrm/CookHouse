import { useEffect, useState } from "react";
import CreateCommunity from "./CreateCommunity";
import axios from "axios";
import { COMMUNITIES_API_END_POINT } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSelfCommunity } from "../redux/slices/user.slice.js";
import LoadingSpinner from "./LoadingSpinner";
import CommunityCard from "./CommunityCard";

const ManageCommunity = () => {
  const [feedType, setFeedType] = useState("manage");

  const { loading, selfCommunity } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllOwnedCommunities() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${COMMUNITIES_API_END_POINT}/own`, {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setSelfCommunity(response.data.communities));
        }
      } catch (err) {
        console.error(err.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, []);

  return (
    <>
      <main className="relative h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden">
        <section>
          <div className="sticky flex w-full font-semibold bg-[#fafafa] z-[100] shadow-md">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("manage")}
            >
              Manage Community
              {feedType === "manage" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("add")}
            >
              Add Community
              {feedType === "add" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
          </div>
          <div className="flex w-full mt-2 sm:mt-3 justify-center">
            {feedType === "manage" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loading && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loading && selfCommunity.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                    No Communities found.
                  </div>
                )}
                {!loading &&
                  selfCommunity.length > 0 &&
                  selfCommunity.map((community) => {
                    return (
                      <div className="block w-full" key={community._id}>
                        <CommunityCard community={community} />
                      </div>
                    );
                  })}
              </div>
            )}
            {feedType === "add" && (
              <div className="flex flex-col flex-nowrap place-items-baseline w-full max-w-full h-[70vh]">
                <CreateCommunity />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ManageCommunity;
