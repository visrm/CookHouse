import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../redux/slices/chat.slice.js";

const Conversation = ({ user, lastIdx }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((store) => store.chats);

  const isSelected = selectedConversation?._id === user?._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center w-full h-fit max-w-full hover:bg-blue-400 p-1 cursor-pointer transition-all duration-300 ${
          isSelected ? "bg-blue-400 shadow-md" : ""
        }`}
        onClick={() => dispatch(setSelectedConversation(user))}
      >
        <div className="avatar">
          <div className="w-8 sm:w-10.5 rounded-full ring-1 ring-slate-500">
            <img
              src={
                user?.profile?.profileImg || "/assets/avatar-placeholder.png"
              }
              alt="user avatar"
              className="h-8 sm:h-10.5 rounded-full border border-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 truncate w-24 sm:w-fit">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-slate-800">{user?.username}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
