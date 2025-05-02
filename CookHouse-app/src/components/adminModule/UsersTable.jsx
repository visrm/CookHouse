import { useSelector } from "react-redux";
import useGetExcludingAuthUsers from "../Hooks/useGetExcludingAuthUsers";
import LoadingSpinner from "../LoadingSpinner";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { USERS_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

const UsersTable = () => {
  useGetExcludingAuthUsers();

  const { loading, excludingAuthUser } = useSelector((store) => store.users);
  const navigate = useNavigate();

  let i = 0;

  const handleDeletion = async (userId) => {
    try {
      const response = await axios.delete(`${USERS_API_END_POINT}/${userId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="px-2 py-1 h-full">
        <div className="rounded-box border border-base-content/5 bg-base-200 h-full">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
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
            {!loading && excludingAuthUser.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>No Users found.</tr>
              </tbody>
            )}
            <tbody>
              {!loading &&
                excludingAuthUser.length > 0 &&
                excludingAuthUser.map((user) => {
                  i++;
                  return (
                    <tr key={user?._id}>
                      <th>{i}</th>
                      <td>{user?._id}</td>
                      <td>{user?.username}</td>
                      <td>{user?.email}</td>
                      <td>Communities</td>
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
