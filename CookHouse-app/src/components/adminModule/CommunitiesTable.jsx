import { useSelector } from "react-redux";
import useGetAllCommunities from "../Hooks/useGetAllCommunities";
import LoadingSpinner from "../LoadingSpinner";
import { MdMoreVert } from "react-icons/md";
import { COMMUNITIES_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const CommunitiesTable = (refreshVar) => {
  const [keyword, setKeyword] = useState("");

  useGetAllCommunities(keyword, refreshVar);

  const navigate = useNavigate();
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

  let i = 0;

  const handleDeletion = async (communityId) => {
    try {
      if (window.confirm("Are you sure you want to delete this community?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${COMMUNITIES_API_END_POINT}/delete/${communityId}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } else {
        // User clicked Cancel
        toast.error("Deletion cancelled.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="px-2 py-1 h-full w-full max-w-full">
        <article className="block my-2 md:mt-3">
          <div>
            <form
              onSubmit={handleSearch}
              className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full"
              id="comm-search-bar-form"
            >
              <input
                type="text"
                name="q"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                placeholder="Search"
                className="input input-sm bg-[#fdfdfd] focus:outline-none rounded-full"
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
              <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                {`Search results ( ${allCommunities.length} )`}
              </span>
            )}
          </div>
        </article>
        <div className="rounded-box border border-base-content/5 bg-base-200 h-full max-w-full">
          <table className="table table-xs">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>ID</th>
                <th>OwnerID</th>
                <th>Name</th>
                <th>email</th>
                <th>Posts</th>
                <th>Recipes</th>
                <th>Events</th>
                <th>Members</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            {loadingCommunity && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loadingCommunity && allCommunities.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>
                  <td>No Communities found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loadingCommunity &&
                allCommunities.length > 0 &&
                allCommunities.map((community) => {
                  i++;
                  return (
                    <tr key={community?._id} className="text-center">
                      <th>{i}</th>
                      <td>{community?._id}</td>
                      <td>{community?.owner?._id}</td>
                      <td>{community?.name}</td>
                      <td>{community?.owner?.email}</td>
                      <td>{community?.posts?.length || 0}</td>
                      <td>{community?.recipes?.length || 0}</td>
                      <td>{community?.events?.length || 0}</td>
                      <td>{community?.members?.length || 0}</td>
                      <td>{community?.createdAt.split("T")[0].trim()}</td>
                      <td>{community?.updatedAt.split("T")[0].trim()}</td>
                      <td>
                        <div className="flex justify-end dropdown dropdown-start dropdown-hover mx-2">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm border-0 rounded-full"
                          >
                            <MdMoreVert className="w-fit" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="menu dropdown-content gap-0.5 border-1 border-slate-200 bg-[#fdfdfd] rounded-box z-1 mt-9 w-38 p-0.5 shadow-sm text-xs font-semibold"
                          >
                            <li>
                              <button
                                className="btn hover:text-indigo-400 border btn-sm"
                                onClick={(e) => {
                                  navigate(`/community/${community._id}`);
                                }}
                              >
                                Visit
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn hover:text-red-400 border btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeletion(community?._id);
                                }}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CommunitiesTable;
