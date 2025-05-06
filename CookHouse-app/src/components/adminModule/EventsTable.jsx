import { useEffect, useState } from "react";
import useGetAllEvents from "../Hooks/useGetAllEvents";
import axios from "axios";
import { EVENTS_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { extractTime, getMonth } from "../../utils/extractTime.js";
import { setLoadingEvent } from "../../redux/slices/event.slice.js";
import { LuSearch } from "react-icons/lu";

const EventsTable = () => {
  const [keyword, setKeyword] = useState("");

  useGetAllEvents(keyword);

  const { loadingEvent, allEvents } = useSelector((store) => store.events);
  const dispatch = useDispatch();

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

  const formattedDate = (string) => {
    var dateString = ` ${string.split("T")[0].split("-")[2]} ${getMonth(
      string.split("T")[0].split("-")[1]
    )} ${string.split("T")[0].split("-")[0]}, ${extractTime(string)}`;
    return dateString.trim();
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
            {!loadingEvent && (
              <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                {`Search results ( ${allEvents.length} )`}
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
                <th>CommunityID</th>
                <th>Title</th>
                <th>Organiser</th>
                <th>Date/Time</th>
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
                <tr>
                  <td>No Events found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loadingEvent &&
                allEvents.length > 0 &&
                allEvents.map((event) => {
                  i++;
                  return (
                    <tr key={event?._id} className="text-center">
                      <th>{i}</th>
                      <td>{event?._id}</td>
                      <td>{event?.community?._id}</td>
                      <td>{event?.title}</td>
                      <td>{event?.organiser?.username}</td>
                      <td>
                        <span>{formattedDate(event?.startDate)}</span> -
                        <span>{formattedDate(event?.endDate)}</span>
                      </td>
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
                                  e.preventDefault();
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
