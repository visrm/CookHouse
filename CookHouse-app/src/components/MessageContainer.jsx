import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/chat.slice.js";
import { MdOutlineRefresh } from "react-icons/md";

const MessageContainer = () => {
  const [chatRefresh, setChatRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { selectedConversation } = useSelector((store) => store.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => dispatch(setSelectedConversation(null));
  }, [setSelectedConversation]);

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setChatRefresh({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
  const refreshAnimate = isRefreshing ? "loading loading-md" : "";

  return (
    <>
      <div className="md:min-w-[450px] flex flex-col bg-indigo-50">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-row justify-between bg-amber-200/75 px-2 py-2 sm:px-4 mb-2">
              <div>
                <span className="label-text sm:text-base">To:</span>{" "}
                <span className="text-slate-900 sm:text-xl font-semibold">
                  {selectedConversation?.fullname}
                </span>
              </div>

              <div>
                <button
                  className="flex rounded-full w-fit hover:text-indigo-400 hover:scale-110"
                  onClick={handleRefresh}
                >
                  <MdOutlineRefresh
                    className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
                  />
                </button>
              </div>
            </div>
            <Messages refreshVar={chatRefresh} />
            <div className="block sticky bottom-0 w-full bg-[#FECD62] z-10">
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
        <div className="px-4 text-center sm:text-lg md:text-xl lg:text-3xl text-slate-800 font-semibold flex flex-col items-center gap-0.5">
          <p>Welcome 👋 {user?.fullname} ❄</p>
          <p className="text-base md:text-lg lg:text-xl">
            Select a chat to start messaging
          </p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    </>
  );
};
