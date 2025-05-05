import axios from "axios";
import { useState } from "react";
import { BsEmojiSmileFill, BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CHATS_API_END_POINT } from "../utils/constants.js";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { loadingMessages, selectedConversation } = useSelector(
    (store) => store.chats
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let messageObj = { message: message };
      const response = await axios.post(
        `${CHATS_API_END_POINT}/message/send/${selectedConversation?._id}`,
        messageObj,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setMessage("");
      setOpenEmoji(false);
    }
  };

  return (
    <>
      <form
        className="relative px-4 my-3 transition-all duration-300"
        id="messageInputForm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row flex-nowrap w-full relative">
          {openEmoji && (
            <div className="absolute bottom-[110%] left-5 z-[100]">
              <EmojiPicker
                onEmojiClick={(e) => setMessage(message + e.emoji)}
                height="24rem"
                width="24rem"
              />
            </div>
          )}
          <div>
            <button
              className="border-0 hover:scale-110 p-2 mx-1"
              onClick={() => {
                setOpenEmoji(!openEmoji);
              }}
              type="button"
            >
              <BsEmojiSmileFill className="h-6 w-6 fill-indigo-600" />
            </button>
          </div>

          <input
            type="text"
            className="input border-none text-base font-medium rounded-full block w-full p-2.5 text-gray-900"
            placeholder="Send a message"
            maxLength={250}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loadingMessages ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend className="h-6 w-6" />
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default MessageInput;
