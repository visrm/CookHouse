import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityEvents,
  setLoadingEvent,
} from "../redux/slices/event.slice.js";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import toast from "react-hot-toast";
import { EVENTS_API_END_POINT } from "../utils/constants.js";
import EventCard from "./EventCard.jsx";

const CommunityEvents = ({ communityId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchCommunityEvents() {
      try {
        dispatch(setLoadingEvent(true));
        const response = await axios.get(
          `${EVENTS_API_END_POINT}/community/${communityId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setCommunityEvents(response.data.events));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingEvent(false));
      }
    })();
  }, [communityId]);

  const { loadingEvent, communityEvents } = useSelector(
    (store) => store.events
  );

  return (
    <>
      {loadingEvent && (
        <div className="block text-center">
          <LoadingSpinner size="lg" />
        </div>
      )}
      {!loadingEvent && communityEvents.length === 0 && (
        <div className="block text-center text-sm p-2 sm:p-4">
          No community events found.
        </div>
      )}
      {!loadingEvent &&
        communityEvents.length > 0 &&
        communityEvents.map((event) => {
          return <EventCard event={event} key={event?._id} />;
        })}
    </>
  );
};

export default CommunityEvents;
