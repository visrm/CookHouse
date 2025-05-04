import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { NOTIFICATIONS_API_END_POINT } from "../../utils/constants.js";

import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotifications,
  setLoading,
} from "../../redux/slices/user.slice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineRefresh } from "react-icons/md";

const Notifications = () => {
  const [notifs, setNotifs] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { loading, allNotifications } = useSelector((store) => store.users);
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
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [notifs]);

  const deleteNotifications = async () => {
    try {
      const response = await axios.delete(`${NOTIFICATIONS_API_END_POINT}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setNotifs({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
  const refreshAnimate = isRefreshing ? "rotate-360" : "";

  return (
    <>
      <div className="relative flex-[4_4_0] border-l border-r border-gray-700 h-full min-h-[90svh] md:min-h-screen transition-all duration-300">
        <div className="sticky top-11 md:top-14 flex justify-between items-center p-4 bg-[#fafafa] border-b border-gray-700 z-20">
          <p className="font-bold font-serif">Notifications</p>
          <div className="flex items-center">
            <button
              className="flex rounded-full w-fit hover:text-indigo-400 hover:scale-110"
              onClick={handleRefresh}
            >
              <MdOutlineRefresh
                className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
              />
            </button>
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="m-1">
                <FaTrashAlt className="w-8 md:w-10 hover:scale-110 hover:text-red-600" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={deleteNotifications}>Delete all notifications</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {allNotifications?.length === 0 && (
          <div className="text-center p-3 font-bold">No notifications 🤔</div>
        )}
        {allNotifications?.map((notification) => (
          <div className="border-0" key={notification?._id}>
            <div className="flex gap-2 p-4">
              {notification?.type === "follow" && (
                <FaUser className="w-7 h-7 text-primary" />
              )}
              {notification?.type === "like" && (
                <AiFillHeart className="w-7 h-7 text-red-500" />
              )}
              <Link to={`/profile/${notification?.from?.username}`}>
                <div className="flex gap-1">
                  <span className="font-bold">
                    @{notification?.from?.username}
                  </span>{" "}
                  {notification?.type === "follow"
                    ? "followed you"
                    : "liked your post"}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
