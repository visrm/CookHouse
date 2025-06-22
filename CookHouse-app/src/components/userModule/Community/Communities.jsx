import { useSelector } from "react-redux";
import useGetAllCommunities from "../../Hooks/useGetAllCommunities";
import CommunityCard from "../../CommunityCard";
import LoadingSpinner from "../../LoadingSpinner";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import CommunityCardSkeleton from "../../Skeleton/CommunityCardSkeleton";

const Communities = () => {
  const [keyword, setKeyword] = useState("");

  useGetAllCommunities(keyword);

  const { loadingCommunity, allCommunities } = useSelector(
    (store) => store.communities
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlParams.get("keyword");
    if (keywordFromUrl) setKeyword(keywordFromUrl);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("keyword", keyword);
  };

  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-center p-4 bg-[#fafafa] border-b border-gray-700 z-20">
          <p className="font-bold font-serif">Communities</p>
        </div>
        <section>
          <article className="block mt-2 md:mt-3">
            <div>
              <form
                onSubmit={handleSearch}
                className="flex flex-row flex-nowrap gap-2 items-center justify-center w-full"
                id="search-bar-form2"
              >
                <input
                  type="text"
                  name="q"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  placeholder="Search"
                  className="input input-sm bg-[#fff] focus:outline-none rounded-full"
                />
                <button
                  className="btn btn-sm bg-slate-300 border-none rounded-full"
                  type="submit"
                >
                  <LuSearch className="h-5 w-4" />
                </button>
              </form>
            </div>
            <div>
              {!loadingCommunity && (
                <span className="block w-full p-2 sm:p-3 my-2 font-bold font-mono text-xs text-left">
                  {`Search results (${allCommunities.length})`}
                </span>
              )}
            </div>
          </article>
          <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 p-2 min-h-full w-full max-w-full">
            {loadingCommunity && (
              <div className="block text-center gap-0.5">
                {[...Array(4)].map((_, idx) => (
                  <CommunityCardSkeleton key={idx} />
                ))}
              </div>
            )}
            {!loadingCommunity && allCommunities.length === 0 && (
              <div className="block text-center text-sm p-2 sm:p-4">
                No Communities found.
              </div>
            )}
            {!loadingCommunity &&
              allCommunities.length > 0 &&
              allCommunities.map((community) => {
                return (
                  <CommunityCard community={community} key={community?._id} />
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Communities;
