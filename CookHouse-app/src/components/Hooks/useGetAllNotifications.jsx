import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAllNotifications,
  setLoading,
} from "../../redux/slices/user.slice.js";
import { NOTIFICATIONS_API_END_POINT } from "../../utils/constants.js";

const useGetAllNotifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function FetchNotifications() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${NOTIFICATIONS_API_END_POINT}/`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllNotifications(response.data.notifications));
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, []);
};

export default useGetAllNotifications;
