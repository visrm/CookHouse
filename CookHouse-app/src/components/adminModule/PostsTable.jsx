import { useEffect, useState } from "react";
import useGetAllPosts from "../Hooks/useGetAllPosts";
import axios from "axios";
import { POSTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { MdMoreVert } from "react-icons/md";
import { useSelector } from "react-redux";
import { LuSearch } from "react-icons/lu";

const PostsTable = (refreshVar) => {
  const [keyword, setKeyword] = useState("");

  useGetAllPosts(keyword, refreshVar);

  const { loadingPost, allPosts } = useSelector((store) => store.posts);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlParams.get("keyword");
    if (keywordFromUrl) setKeyword(keywordFromUrl);
  }, [location.search]);

  const handleSearch = (e) => {
    e.prrecipeDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("keyword", keyword);
  };

  let i = 0;

  const handleDeletion = async (postId) => {
    try {
      if (window.confirm("Are you sure you want to delete the post?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${POSTS_API_END_POINT}/${postId}`,
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
              id="evnt-search-bar-form"
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
            {!loadingPost && (
              <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                {`Search results ( ${allPosts.length} )`}
              </span>
            )}
          </div>
        </article>
        <div className="rounded-box border border-base-content/5 bg-base-200 h-full max-w-full">
          <table className="table table-xs text-xs">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>ID</th>
                <th>Community</th>
                <th>Creator</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            {loadingPost && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loadingPost && allPosts.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>
                  <td>No post found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loadingPost &&
                allPosts.length > 0 &&
                allPosts.map((post) => {
                  i++;
                  return (
                    <tr key={post?._id} className="text-center">
                      <th>{i}</th>
                      <td>{post?._id}</td>
                      <td>{post?.community?._id || "null"}</td>
                      <td>{post?.user?.username}</td>
                      <td>{post?.createdAt.split("T")[0].trim()}</td>
                      <td>{post?.updatedAt.split("T")[0].trim()}</td>
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
                            className="menu dropdown-content gap-0.5 border-1 border-slate-200 bg-[#fdfdfd] rounded-box z-1 mt-9 w-38 p-0.5 shadow-sm text-xs font-medium"
                          >
                            <li>
                              <button
                                className="btn hover:text-red-400 border btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeletion(post?._id);
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

export default PostsTable;
