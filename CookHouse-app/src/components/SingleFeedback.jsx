import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setLoadingFeedback,
  setSingleFeedback,
} from "../redux/slices/feedback.slice.js";
import { FEEDBACKS_API_END_POINT } from "../utils/constants.js";
import { useEffect } from "react";
import FeedbackCard from "./FeedbackCard.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const SingleFeedback = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loadingFeedback, singleFeedback } = useSelector(
    (store) => store.feedbacks
  );

  useEffect(() => {
    var feedbackId = params.id;
    (async function FetchSingleFeedback() {
      try {
        dispatch(setLoadingFeedback(true));
        const response = await axios.get(
          `${FEEDBACKS_API_END_POINT}/${feedbackId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSingleFeedback(response.data.feedback));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingFeedback(false));
      }
    })();
  }, []);

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="flex flex-col flex-nowrap gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-4">
          {loadingFeedback && (
            <div className="flex flex-col flex-nowrap text-center gap-2 sm:gap-3">
              <div className="loading loading-md" />
            </div>
          )}
          {!loadingFeedback && singleFeedback?.length === 0 && (
            <div className="block text-center text-sm p-2 sm:p-4">
              Feedback NOT found.
            </div>
          )}
          {!loadingFeedback && (
            <div className="block h-full w-full max-w-full p-2 sm:p-4">
              <FeedbackCard feedback={singleFeedback} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SingleFeedback;
