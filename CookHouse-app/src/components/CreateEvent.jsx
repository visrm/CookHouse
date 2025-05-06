import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENTS_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import axios from "axios";
import { BsEmojiSmileFill } from "react-icons/bs";
import { setLoadingEvent } from "../redux/slices/event.slice";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    desc: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const isPending = false;
  const isError = false;

  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { singleCommunity } = useSelector((store) => store.communities);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingEvent(true));
    try {
      let communityId = singleCommunity._id;

      let eventData = {
        user: user?._id,
        title: event.title,
        description: event.desc,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
      };
      const response = await axios.post(
        `${EVENTS_API_END_POINT}/${communityId}/create`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
          },
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
      setEvent({
        title: "",
        desc: "",
        startDate: "",
        endDate: "",
        location: "",
      });
    }
  };

  const handleInputChange = (e) => {
    // console.log({ ...event, [e.target.name]: e.target.value });
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <>
      <article className="flex flex-col min-w-fit w-[75%] md:w-[50%] max-w-[90%] mx-auto">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="submit-btn transition-all duration-300"
          onClick={() => document.getElementById("addeventModal").showModal()}
        >
          Add Event
        </button>
        <dialog id="addeventModal" className="modal">
          <div className="modal-box flex flex-col flex-nowrap my-2  w-full rounded-xl bg-[#fafafa] items-start border-b border-gray-100">
            <form method="dialog" id="handleClosEvent">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => {
                  setEvent({
                    title: "",
                    desc: "",
                    startDate: "",
                    endDate: "",
                    location: "",
                  });
                }}
              >
                ✕
              </button>
            </form>
            <form
              className="flex flex-col gap-1 w-full h-full items-center"
              onSubmit={handleSubmit}
              id="handleCreateevent"
            >
              <h3 className="font-bold text-lg md:text-xl font-serif">Create Event</h3>
              <div className="w-[90%]">
                <label className="w-fit font-base text-sm" htmlFor="title">
                  Title :
                </label>
                <input
                  className="rounded-md input w-full border focus:outline-none bg-[#fdfdfd]  border-slate-300"
                  placeholder="Event title"
                  name="title"
                  id="title"
                  value={event.title}
                  onChange={handleInputChange}
                  maxLength={"50ch"}
                  required
                />
              </div>
              <div className="w-[90%]">
                <label className="w-fit font-base text-sm" htmlFor="desc">
                  Description :
                </label>
                <input
                  className="rounded-md input w-full border focus:outline-none bg-[#fdfdfd]  border-slate-300"
                  placeholder="Event description"
                  name="desc"
                  id="desc"
                  value={event.desc}
                  onChange={handleInputChange}
                  maxLength={"500ch"}
                />
              </div>
              <div className="w-[90%]">
                <label className="w-fit font-base text-sm" htmlFor="location">
                  Location :
                </label>
                <input
                  className="rounded-md input w-full border focus:outline-none bg-[#fdfdfd]  border-slate-300"
                  placeholder="Event Venue"
                  name="location"
                  id="location"
                  value={event.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-[90%]">
                <p className="w-fit font-base text-sm">Date & Time :</p>
                <div className="flex flex-row justify-around items-center gap-1.5 w-full max-w-full">
                  <input
                    className="rounded-md input w-full border focus:outline-none bg-[#fdfdfd]  border-slate-300"
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    value={event.startDate}
                    onChange={handleInputChange}
                    required
                  />
                  {" "}To{" "}
                  <input
                    className="rounded-md input w-full border focus:outline-none bg-[#fdfdfd]  border-slate-300"
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    value={event.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between border-t py-1 md:my-2 border-t-gray-100 w-full">
                <div className="flex items-center">
                  <BsEmojiSmileFill
                    className="fill-slate-700 w-5 h-5 cursor-pointer"
                    title="Add emoji"
                  />
                </div>

                <button
                  className="submit-btn px-4"
                  type="submit"
                >
                  {isPending ? "Creating..." : "Create"}
                </button>
              </div>
              {isError && (
                <div className="text-red-500">Something went wrong</div>
              )}
            </form>
          </div>
        </dialog>
      </article>
    </>
  );
};

export default CreateEvent;
