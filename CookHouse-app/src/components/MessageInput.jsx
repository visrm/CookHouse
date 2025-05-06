import axios from "axios";
import { useRef, useState } from "react";
import { BsEmojiSmileFill, BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CHATS_API_END_POINT } from "../utils/constants.js";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);

  const imgRef = useRef(null);

  const { loadingMessages, selectedConversation } = useSelector(
    (store) => store.chats
  );

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let messageObj = { message: message, media_url: img };
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
      setImg(null);
    }
  };

  return (
    <>
      <form
        className="relative px-4 my-3 transition-all duration-300"
        id="messageInputForm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row flex-nowrap w-full relative items-center">
          {openEmoji && (
            <div className="absolute bottom-[110%] left-5 z-[100]">
              <EmojiPicker
                onEmojiClick={(e) => setMessage(message + e.emoji)}
                height="24rem"
                width="24rem"
              />
            </div>
          )}

          <div className="flex gap-1 sm:gap-2 items-center px-2">
            <CiImageOn
              className="fill-slate-700 w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
              title="Add image"
            />
            <BsEmojiSmileFill
              className="fill-slate-700 w-5 h-5 cursor-pointer"
              onClick={() => setOpenEmoji(!openEmoji)}
              title="Add emoji"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <input
            type="text"
            className="input border-none text-base font-medium focus:outline-0 rounded-full block w-full p-2.5 text-slate-900"
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
      {img && (
        <div className="relative w-72 mx-auto">
          <IoCloseSharp
            className="absolute top-0 right-0 text-white bg-slate-800 rounded-full w-5 h-5 cursor-pointer"
            onClick={() => {
              setImg(null);
              imgRef.current.value = null;
            }}
            type="button"
          />
          <img
            src={img}
            className="w-full mx-auto h-72 object-contain rounded"
          />
        </div>
      )}
    </>
  );
};
export default MessageInput;
