import { useSelector } from "react-redux";
import useGetAllCommunities from "./Hooks/useGetAllCommunities";
import CommunityCard from "./CommunityCard";
import LoadingSpinner from "./LoadingSpinner";

const Communities = () => {
  useGetAllCommunities();

  const { loadingCommunity, allCommunities } = useSelector(
    (store) => store.communities
  );
  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-[#ffffff] border-b border-gray-700 z-20">
          <p className="font-bold">Communities</p>
        </div>
        <section>
          <div className="flex flex-col flex-nowrap gap-1 p-2 min-h-full w-full max-w-full">
            {loadingCommunity && (
              <div className="block text-center p-2 h-52">
                <LoadingSpinner size="lg" />
              </div>
            )}
            {!loadingCommunity && allCommunities.length === 0 && (
              <div className="block text-center text-sm p-2 sm:p-4 bg-[#fdfdfd]">
                No Communities found.
              </div>
            )}
            {!loadingCommunity &&
              allCommunities.length !== 0 &&
              allCommunities.map((community) => {
                return (
                  <CommunityCard community={community} key={community._id} />
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Communities;
