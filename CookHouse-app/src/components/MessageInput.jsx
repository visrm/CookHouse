import axios from "axios";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CHATS_API_END_POINT } from "../utils/constants";
import { setLoadingMessages } from "../redux/slices/chat.slice.js";
import toast from "react-hot-toast";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loadingMessages, selectedConversation } = useSelector(
    (store) => store.chats
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoadingMessages(true));
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
      dispatch(setLoadingMessages(false));
      setMessage("");
    }
  };

  return (
    <>
      <form className="px-4 my-3" id="messageInputForm" onSubmit={handleSubmit}>
        <div className="w-full relative">
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
