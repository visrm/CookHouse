import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { EVENTS_API_END_POINT } from "../../utils/constants.js";
import {
  setAllEvents,
  setLoadingEvent,
} from "../../redux/slices/event.slice.js";
import toast from "react-hot-toast";

const useGetAllEvents = (keyword, refreshVar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllEvents() {
      try {
        dispatch(setLoadingEvent(true));
        const response = await axios.get(
          `${EVENTS_API_END_POINT}/all?keyword=${keyword}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setAllEvents(response.data.events));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingEvent(false));
      }
    })();
  }, [keyword, refreshVar]);
};

export default useGetAllEvents;
