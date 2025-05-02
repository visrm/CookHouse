import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineHome,
  MdNotificationsNone,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { RiCommunityLine, RiWechatLine } from "react-icons/ri";
import { TbFileDescription, TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/slices/auth.slice.js";
import { AUTH_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store.js";

const SideBar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${AUTH_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        store.dispatch({ type: "LOGOUT" });
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {user && (
        <div
          className="sticky top-14 md:top-16 md:flex-[4_4_0] flex-col flex-nowrap w-18 md:w-42 min-h-screen max-w-42 min-w-fit text-black z-[100]"
          id="side-bar"
        >
          <div className="flex flex-col justify-start bg-amber-200 w-full h-full">
            <ul className="flex flex-col gap-2 h-full">
              <li className="flex justify-center md:justify-start">
                <Link
                  to="/home"
                  className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                  replace
                >
                  <MdOutlineHome className="w-8 h-8" />
                  <span className="text-base hidden font-semibold md:block">
                    Home
                  </span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start">
                <Link
                  to="/notifications"
                  className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                  replace
                >
                  <MdNotificationsNone className="w-8 h-8" />
                  <span className="text-base hidden font-semibold md:block">
                    Notifications
                  </span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start">
                <Link
                  to={`/profile/${user?.username}`}
                  className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                >
                  <LuUserRound className="w-8 h-8" />
                  <span className="text-base hidden font-semibold md:block">
                    Profile
                  </span>
                </Link>
              </li>

              {user?.role === "user" && (
                <li className="flex justify-center md:justify-start">
                  <Link
                    to="/recipes"
                    className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                    replace
                  >
                    <TbFileDescription className="w-8 h-8" />
                    <span className="text-base hidden font-semibold md:block">
                      Recipes
                    </span>
                  </Link>
                </li>
              )}

              {user?.role === "user" && (
                <li className="flex justify-center md:justify-start">
                  <Link
                    to="/conversations"
                    className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                    replace
                  >
                    <RiWechatLine className="w-8 h-8" />
                    <span className="text-base hidden font-semibold md:block">
                      Chats
                    </span>
                  </Link>
                </li>
              )}

              {user?.role === "user" && (
                <li className="flex justify-center md:justify-start">
                  <Link
                    to="/community"
                    className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                    replace
                  >
                    <RiCommunityLine className="w-8 h-8" />
                    <span className="text-base hidden font-semibold md:block">
                      Community
                    </span>
                  </Link>
                </li>
              )}

              {user?.role === "admin" && (
                <li className="flex justify-center md:justify-start">
                  <Link
                    to="/admin"
                    className="flex gap-3 items-center py-2 pl-2 pr-4 max-w-fit cursor-pointer"
                    replace
                  >
                    <MdOutlineAdminPanelSettings className="w-8 h-8" />
                    <span className="text-base hidden font-semibold md:block">
                      Settings
                    </span>
                  </Link>
                </li>
              )}
            </ul>

            <div className="sticky bottom-0 left-0 mt-auto flex gap-1 sm:gap-2  py-2 px-4 w-full min-h-fit bg-[#feb340]/50">
              <Link
                to={`/profile/${user?.username}`}
                className="flex gap-2 item-start"
              >
                <div className="avatar h-10 hidden md:inline-flex">
                  <div className="w-10 rounded-full border border-slate-900">
                    <img
                      src={
                        user?.profile?.profileImg ||
                        "/assets/avatar-placeholder.png"
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-1">
                  <div className="hidden md:block">
                    <p className="text-slate-900 font-bold text-sm w-20 truncate">
                      {user?.fullname}
                    </p>
                    <p className="text-slate-700 text-xs">@{user?.username}</p>
                  </div>
                </div>
              </Link>
              <div className="tooltip" data-tip="LogOut">
                <TbLogout
                  className="w-6 h-6 cursor-pointer hover:scale-105"
                  onClick={handleLogOut}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SideBar;
