import { useEffect } from "react";
import axios from "axios";
import { FEEDBACKS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllFeedbacks,
  setLoadingFeedback,
} from "../../redux/slices/feedback.slice.js";

const FeedbacksTable = (refreshVar) => {
  const { loadingFeedback, allFeedbacks } = useSelector(
    (store) => store.feedbacks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchFeedbacks() {
      try {
        dispatch(setLoadingFeedback(true));
        const response = await axios.get(`${FEEDBACKS_API_END_POINT}/`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllFeedbacks(response.data.feedbacks));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingFeedback(false));
      }
    })();
  }, [refreshVar]);

  let i = 0;

  const handleDeletion = async (feedbackId) => {
    try {
      if (window.confirm("Are you sure you want to delete the feedback?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${FEEDBACKS_API_END_POINT}/${feedbackId}`,
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
            {!loadingFeedback && (
              <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                {`Search results ( ${allFeedbacks.length} )`}
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
                <th>SenderID</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            {loadingFeedback && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loadingFeedback && allFeedbacks.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>
                  <td>No feedback(s) found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loadingFeedback &&
                allFeedbacks.length > 0 &&
                allFeedbacks.map((feedback) => {
                  i++;
                  return (
                    <tr key={feedback?._id} className="text-center">
                      <th>{i}</th>
                      <td>{feedback?._id}</td>
                      <td>{feedback?.from?._id}</td>
                      <td>{feedback?.email}</td>
                      <td>{feedback?.subject}</td>
                      <td>{feedback?.message}</td>
                      <td>{feedback?.createdAt.split("T")[0].trim()}</td>
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
                                  handleDeletion(feedback?._id);
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

export default FeedbacksTable;
