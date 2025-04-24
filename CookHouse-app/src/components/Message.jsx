import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime.js";

const Message = ({ message }) => {
  const { user } = useSelector((store) => store.auth);
  const { selectedConversation } = useSelector((store) => store.chats);

  const fromMe = message?.senderId === user?._id;

  const formattedTime = extractTime(message?.createdAt);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profileImg = fromMe
    ? user?.profile?.profileImg
    : selectedConversation?.profile?.profileImg;
  const bubbleBgColor = fromMe ? "bg-indigo-400" : "";

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profileImg} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
          {message?.message}
          {message?.media_url && (
            <img
              alt="Tailwind CSS chat bubble component"
              src={message?.media_url}
            />
          )}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </>
  );
};
export default Message;
