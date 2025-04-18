import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { POSTS_API_END_POINT } from "../utils/constants";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const isPending = false;
  const isError = false;

  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let postData = {
        user: user?._id,
        text: text,
        media_url: img,
      };
      const response = await axios.post(
        `${POSTS_API_END_POINT}/create`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

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

  return (
    <>
      <article className="flex flex-col min-w-fit w-[75%] md:w-[50%] max-w-[90%] mx-auto">
        <div className="flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl bg-amber-200 p-4 items-start gap-4 border-b border-gray-100">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={
                  user?.profile?.profileImg || "/assets/avatar-placeholder.png"
                }
              />
            </div>
          </div>
          <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit} id="handleCreatePost">
            <textarea
              className="textarea sm:textarea-md w-full p-1 sm:p-2 text-base sm:text-lg resize-none border-none focus:outline-none  border-gray-200"
              placeholder="What's happening?!"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {img && (
              <div className="relative w-72 mx-auto">
                <IoCloseSharp
                  className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setImg(null);
                    imgRef.current.value = null;
                  }}
                />
                <img
                  src={img}
                  className="w-full mx-auto h-72 object-contain rounded"
                />
              </div>
            )}

            <div className="flex justify-between border-t py-2 border-t-gray-100">
              <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center">
                <CiImageOn
                  className="fill-primary w-6 h-6 cursor-pointer"
                  onClick={() => imgRef.current.click()}
                  title="Add image"
                />
                <BsEmojiSmileFill
                  className="fill-primary w-5 h-5 cursor-pointer"
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
              <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                {isPending ? "Posting..." : "Post"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500">Something went wrong</div>
            )}
          </form>
        </div>
      </article>
    </>
  );
};
export default CreatePost;
