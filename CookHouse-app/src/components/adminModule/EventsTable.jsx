import useGetAllEvents from "../Hooks/useGetAllEvents";
import axios from "axios";
import { EVENTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { extractTime, getMonth } from "../../utils/extractTime.js";
import { setLoadingEvent } from "../../redux/slices/event.slice.js";

const EventsTable = () => {
  useGetAllEvents();

  const { loadingEvent, allEvents } = useSelector((store) => store.events);
  const dispatch = useDispatch();

  const formattedDate = (string) => {
    var dateString = ` ${string.split("T")[0].split("-")[2]} ${getMonth(
      string.split("T")[0].split("-")[1]
    )} ${string.split("T")[0].split("-")[0]}, ${extractTime(string)}`;
    return dateString;
  };

  let i = 0;

  const handleDeletion = async (eventId) => {
    try {
      dispatch(setLoadingEvent(true));
      const response = await axios.delete(
        `${EVENTS_API_END_POINT}/delete/${eventId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingEvent(false));
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
                <th>CommunityID</th>
                <th>OrganiserID</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Attendees</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            {loadingEvent && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loadingEvent && allEvents.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>No Events found.</tr>
              </tbody>
            )}
            <tbody>
              {!loadingEvent &&
                allEvents.length > 0 &&
                allEvents.map((event) => {
                  i++;
                  return (
                    <tr key={event?._id}>
                      <th>{i}</th>
                      <td>{event?._id}</td>
                      <td>{event?.community?._id}</td>
                      <td>{event?.organiser?._id}</td>
                      <td>{formattedDate(event?.startDate)}</td>
                      <td>{formattedDate(event?.endDate)}</td>
                      <td>{event?.attendees.length}</td>
                      <td>{event?.createdAt.split("T")[0].trim()}</td>
                      <td>{event?.updatedAt.split("T")[0].trim()}</td>
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
                                  handleDeletion(event?._id);
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

export default EventsTable;
