import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/chat.slice.js";

const MessageContainer = () => {
  const { selectedConversation } = useSelector((store) => store.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => dispatch(setSelectedConversation(null));
  }, [setSelectedConversation]);

  return (
    <>
      <div className="md:min-w-[450px] flex flex-col bg-indigo-50">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header */}
            <div className="bg-amber-200/75 px-2 py-2 sm:px-4 mb-2">
              <span className="label-text sm:text-base">To:</span>{" "}
              <span className="text-slate-900 sm:text-xl font-semibold">
                {selectedConversation?.fullname}
              </span>
            </div>
            <Messages />
            <div className="block sticky bottom-0 w-full bg-[#FECD62]">
              <MessageInput />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-slate-800 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 {user?.fullname} ❄</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    </>
  );
};
