import { FaTrash } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { timestampFn } from "../utils/extractTime.js";
import { FEEDBACKS_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";

const FeedbackCard = ({ feedback }) => {
  const { user } = useSelector((store) => store.auth);

  const feedbackProvider = feedback?.from;
  const canManage =
    feedbackProvider?.from?._id.toString() === user?._id.toString() ||
    user?.role === "admin";

  const handleDeleteFeedback = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this feedback?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${FEEDBACKS_API_END_POINT}/${feedback?._id}`,
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
      <article className="relative w-[80%] sm:w-[75%] max-w-4xl mx-auto glass-morph overflow-hidden translate-y-[50%]">
        <div className="flex flex-col flex-nowrap gap-0 items-start p-3 sm:p-4 bg-[#fdfdfd] w-full max-w-full">
          <div className="flex flex-row flex-nowrap gap-2 w-full max-w-full mb-2">
            <div className="avatar h-8">
              <Link
                to={`/profile/${feedbackProvider?.username}`}
                className="w-8 bg-white rounded-full overflow-hidden"
              >
                <img
                  src={
                    feedbackProvider?.profile?.profileImg ||
                    "/assets/avatar-placeholder.png"
                  }
                />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Link
                to={`/profile/${feedbackProvider?.username}`}
                className="font-semibold"
              >
                {feedback?.name || feedbackProvider?.fullname}
              </Link>
              <span className="text-gray-700 flex gap-1 text-xs items-center">
                <Link to={`/profile/${feedbackProvider?.username}`}>
                  @{feedbackProvider?.username}
                </Link>
                <span>·</span>
                <span>
                  {timestampFn(feedback?.createdAt) === 0
                    ? "Today"
                    : `${timestampFn(feedback?.createdAt)} days ago`}
                </span>
              </span>
              {canManage && (
                <div className="absolute top-2 right-2 flex justify-end flex-1 dropdown dropdown-start">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm border-0"
                  >
                    <MdMoreVert className="h-5 w-4 rounded-full" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content border-1 border-slate-200 rounded-box z-1 mt-10 w-40 p-1 shadow-sm bg-[#fdfdfd]"
                  >
                    <li>
                      <span
                        className="flex place-items-center gap-1 hover:text-red-500 cursor-pointer font-semibold"
                        onClick={handleDeleteFeedback}
                      >
                        <FaTrash className="h-3 w-3" />
                        Delete
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="ml-4 sm:ml-6 space-y-3 sm:space-y-2 w-full max-w-full">
            <div className="flex flex-col sm:flex-row flex-nowrap gap-1 sm:gap-2 justify-start">
              <p className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Email :
              </p>{" "}
              <p className="block text-xs sm:text-sm font-light">
                {feedback?.email}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-nowrap gap-1 sm:gap-2 justify-start">
              <p className="block text-sm font-medium text-gray-700 mb-1">
                Subject :
              </p>{" "}
              <p className="block text-xs sm:text-sm font-light">
                {feedback?.subject}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-nowrap gap-1 sm:gap-2 justify-start">
              <p className="block text-sm font-medium text-gray-700 mb-1">
                Message :
              </p>{" "}
              <p className="block text-xs sm:text-sm font-light">
                {feedback?.message}
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default FeedbackCard;
