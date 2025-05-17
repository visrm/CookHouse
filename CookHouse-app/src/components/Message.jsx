import { useSelector } from "react-redux";
import { extractTime, getMonth } from "../utils/extractTime.js";
import { CHATS_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { MdMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  const { user } = useSelector((store) => store.auth);
  const { selectedConversation } = useSelector((store) => store.chats);

  const fromMe = message?.senderId === user?._id;

  const formattedDate = (string) => {
    var dateString = ` ${string.split("T")[0].split("-")[2]} ${getMonth(
      string.split("T")[0].split("-")[1]
    )}, ${extractTime(string)}`;
    return dateString.trim();
  };

  const formattedTime = formattedDate(message?.createdAt);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profileImg = fromMe
    ? user?.profile?.profileImg
    : selectedConversation?.profile?.profileImg;
  const bubbleBgColor = fromMe ? "bg-indigo-400" : "bg-indigo-500";

  const handleDeletion = async (messageId) => {
    try {
      const response = await axios.delete(
        `${CHATS_API_END_POINT}/message/delete/${messageId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className={`chat ${chatClassName} p-2`}>
        <div className="chat-image avatar">
          <Link to={`/profile/${selectedConversation?.username}`}>
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={profileImg || "/assets/avatar-placeholder.png"}
              />
            </div>
          </Link>
        </div>

        <div
          className={`relative chat-bubble text-white ${bubbleBgColor} pb-2 sm:pb-4`}
        >
          {message?.message}
          {message?.media_url && (
            <figure className="block h-72 w-auto">
              <img
                alt="image"
                src={message?.media_url}
                className="block w-full h-full max-w-full object-contain"
              />
            </figure>
          )}
          <div
            className={`${
              fromMe
                ? "absolute left-[90%] flex dropdown dropdown-left"
                : "hidden"
            }`}
          >
            <div tabIndex={0} role="button" className="rounded-full">
              <MdMoreVert className="h-4 w-4" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content border-slate-200 bg-[#fdfdfd] rounded-box z-20 mt-1 sm:mt-2 w-28 p-0.5 shadow-sm text-xs font-semibold"
            >
              <li>
                <button
                  className="btn hover:text-red-400 border btn-sm p-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeletion(message?._id);
                  }}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </>
  );
};
export default Message;
