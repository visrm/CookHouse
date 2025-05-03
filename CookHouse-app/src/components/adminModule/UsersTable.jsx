import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllUsers from "../Hooks/useGetAllUsers.jsx";
import LoadingSpinner from "../LoadingSpinner";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { LuSearch } from "react-icons/lu";
import { setLoading } from "../../redux/slices/user.slice.js";

const UsersTable = () => {
  const [keyword, setKeyword] = useState("");

  useGetAllUsers(keyword);

  const { loading, allUsers } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleDeletion = async (userId) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(`${USERS_API_END_POINT}/${userId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <section className="px-2 py-1 h-full">
        <article className="block my-2 md:mt-3">
          <div>
            <form
              onSubmit={handleSearch}
              className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full"
              id="usr-search-bar-form"
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
            {!loading && (
              <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                {`Search results ( ${allUsers.length} )`}
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
                <th>Role</th>
                <th>Username</th>
                <th>Email</th>
                <th>Communities</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            {loading && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loading && allUsers.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>
                  <td>No Users found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loading &&
                allUsers.length > 0 &&
                allUsers.map((user) => {
                  i++;
                  return (
                    <tr key={user?._id} className="text-center">
                      <th>{i}</th>
                      <td>{user?._id}</td>
                      <td>{user?.role}</td>
                      <td>{user?.username}</td>
                      <td>{user?.email}</td>
                      <td>{user?.profile?.communities?.length || 0}</td>
                      <td>{user?.createdAt.split("T")[0].trim()}</td>
                      <td>{user?.updatedAt.split("T")[0].trim()}</td>
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
                                className="btn hover:text-red-400 border btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeletion(user?._id);
                                }}
                              >
                                Delete account
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn hover:text-indigo-400 border btn-sm"
                                onClick={(e) => {
                                  navigate(`/profile/${user?.username}`);
                                }}
                              >
                                View profile
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

export default UsersTable;
