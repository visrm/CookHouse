import { FaTrash } from "react-icons/fa";
import { extractTime, getMonth } from "../utils/extractTime.js";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingEvent } from "../redux/slices/event.slice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { EVENTS_API_END_POINT } from "../utils/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const EventCard = ({ event }) => {
  const organiser = event?.organiser;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const canManageEvent = organiser?._id === user?._id || user?.role === "admin";

  const formattedDate = (string) => {
    var dateString = ` ${string.split("T")[0].split("-")[2]} ${getMonth(
      string.split("T")[0].split("-")[1]
    )} ${string.split("T")[0].split("-")[0]}, ${extractTime(string)}`;
    return dateString.trim();
  };

  const handleDeleteEvent = async () => {
    try {
      if (window.confirm("Are you sure you want to cancel the event?")) {
        // User clicked OK, proceed with deletion
        dispatch(setLoadingEvent(true));
        const response = await axios.delete(
          `${EVENTS_API_END_POINT}/delete/${event?._id}`,
          { withCredentials: true }
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
    } finally {
      dispatch(setLoadingEvent(false));
    }
  };

  return (
    <>
      <article className="w-[90%] sm:w-[80%] max-w-3xl mx-auto">
        <div className="relative flex flex-col gap-2 items-start p-4 sm:p-6 md:p-8 border border-gray-300 glass-morph bg-[#fdfdfd] rounded">
          {canManageEvent && (
            <div className="absolute top-1 right-2 flex justify-end flex-1 dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm border-0 rounded-full"
              >
                <MdMoreVert className="h-3 w-3 rounded-full" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content border-1 border-slate-200 rounded-box z-1 w-34 p-0.5 mt-1 shadow-sm bg-[#fdfdfd]"
              >
                <li>
                  <span
                    className="flex place-items-center gap-1 hover:text-red-500 cursor-pointer text-sm font-semibold"
                    onClick={() => {
                      handleDeleteEvent(event?._id);
                    }}
                  >
                    <FaTrash className="h-3 w-3" />
                    Delete
                  </span>
                </li>
              </ul>
            </div>
          )}
          {/* Event contents */}
          <div className="mt-2">
            <h2 className="text-xl md:text-2xl font-bold font-serif">
              {event?.title}
            </h2>
            <ReactQuill
              className="block h-full w-full max-w-[95%] py-0 text-base font-base font-sans"
              value={event?.description}
              readOnly={true}
              theme={"bubble"}
            />
          </div>
          <div className="flex flex-col bg-slate-200 w-full max-w-[90%] p-2 border-0 rounded-sm">
            <span className="flex sm:gap-x-2 items-start w-full max-w-full text-xs sm:text-sm">
              <span className="font-bold font-mono w-12 sm:w-10">Date</span> :
              <span className="font-normal font-sans">
                {formattedDate(event?.startDate)} -
                {formattedDate(event?.endDate)}
              </span>
            </span>
            <span className="flex sm:gap-x-2 items-start w-full max-w-full text-xs sm:text-sm">
              <span className="font-bold font-mono w-12 sm:w-10">Venue</span> :
              <span className="font-normal font-sans">{event?.location}</span>
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default EventCard;
