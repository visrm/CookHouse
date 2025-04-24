import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingMessages,
  setSingleChatMessages,
} from "../../redux/slices/chat.slice.js";
import toast from "react-hot-toast";
import { CHATS_API_END_POINT } from "../../utils/constants.js";

const useGetChatMessages = (recieverId) => {
  const { selectedConversation } = useSelector((store) => store.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchSingleChatMessages() {
      try {
        dispatch(setLoadingMessages(true));
        const response = await axios.get(
          `${CHATS_API_END_POINT}/conversation/${recieverId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSingleChatMessages(response.data.messages));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingMessages(false));
      }
    })();
  }, [selectedConversation]);
};

export default useGetChatMessages;
