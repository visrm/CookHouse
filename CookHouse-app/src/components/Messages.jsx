import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import useGetChatMessages from "./Hooks/useGetChatMessages";

const Messages = () => {
  const { loadingMessages, singleChatMessages, selectedConversation } =
    useSelector((store) => store.chats);

  useGetChatMessages(selectedConversation?._id);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {!loadingMessages &&
          singleChatMessages.length > 0 &&
          singleChatMessages.map((message) => (
            <div key={message?._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}

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
