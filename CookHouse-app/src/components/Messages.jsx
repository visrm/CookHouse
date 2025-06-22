import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import useGetChatMessages from "./Hooks/useGetChatMessages";

const Messages = ({ refreshVar }) => {
  const { loadingMessages, singleChatMessages, selectedConversation } =
    useSelector((store) => store.chats);

  useGetChatMessages(selectedConversation?._id, refreshVar);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  }, [lastMessageRef]);

  return (
    <>
      <div className="px-4 flex-1 h-full max-h-[90vh] overflow-scroll">
        {!loadingMessages &&
          singleChatMessages.length > 0 &&
          singleChatMessages.map((message) => {
            return (
              <div
                key={message?._id}
                ref={lastMessageRef}
                className="flex flex-col flex-nowrap w-full gap-0.5 mb-2 sm:mb-4 md:mb-6"
              >
                <Message message={message} />
              </div>
            );
          })}

        {loadingMessages &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loadingMessages && singleChatMessages.length === 0 && (
          <p className="text-center">
            Send a message to start the conversation
          </p>
        )}
      </div>
    </>
  );
};

export default Messages;
