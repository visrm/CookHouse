import axios from "axios";
import { useEffect } from "react";
import { EVENTS_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";
import {
  setLoadingEvent,
  setUsersCommunitiesEvents,
} from "../../redux/slices/event.slice.js";

const useGetUsersCommunitiesEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchUsersCommunitiesEvents() {
      try {
        dispatch(setLoadingEvent(true));
        const response = await axios.get(
          `${EVENTS_API_END_POINT}/communities/user`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setUsersCommunitiesEvents(response.data.events));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingEvent(false));
      }
    })();
  }, []);
};

export default useGetUsersCommunitiesEvents;
