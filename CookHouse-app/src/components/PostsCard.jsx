import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { POSTS_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const postOwner = post?.user;
  const [postState, setPostState] = useState({
    isLiked: false,
    isMyPost: false,
    isCommenting: false,
  });

  // const isLiked = false;

  // const isMyPost = true;

  const formattedDate = "1h";

  // const isCommenting = false;

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${POSTS_API_END_POINT}/delete/${post?._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      let commentData = {
        text: comment,
      };
      const response = await axios.post(
        `${POSTS_API_END_POINT}/comment/${post?._id}`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setComment("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLikePost = async () => {
    try {
      const response = await axios.get(
        `${POSTS_API_END_POINT}/like/${post?._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // let myRegex = /unlike/g;
        // if(!myRegex.test(response.data.message)){
        //   setPostState({isLiked: true})
        // }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <article className="w-[90%] sm:w-[80%] mx-auto">
        <div className="flex gap-2 items-start p-4 border-b border-gray-700 bg-[#fdfdfd]">
          <div className="avatar">
            <Link
              to={`/profile/${postOwner?.username}`}
              className="w-8 rounded-full overflow-hidden">
              <img
                src={
                  postOwner?.profile?.profileImg ||
                  "/assets/avatar-placeholder.png"
                }
              />
            </Link>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-2 items-center">
              <Link
                to={`/profile/${postOwner?.username}`}
                className="font-bold">
                {postOwner?.fullname}
              </Link>
              <span className="text-gray-700 flex gap-1 text-sm">
                <Link to={`/profile/${postOwner?.username}`}>
                  @{postOwner?.username}
                </Link>
                <span>·</span>
                <span>{formattedDate}</span>
              </span>
              {postState.isMyPost && (
                <span className="flex justify-end flex-1">
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-fit overflow-hidden transition-all duration-300">
              <span>{post?.text}</span>
              {post?.media_url && (
                <figure className="flex max-w-[90%] min-h-fit aspect-[16/9] mr-auto bg-[#f5f5f5]">
                  <img
                    src={post?.media_url}
                    className="h-80 object-contain border overflow-hidden rounded-lg border-gray-200"
                    alt=""
                  />
                </figure>
              )}
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-around">
                <div
                  className="flex gap-1 items-center cursor-pointer group"
                  onClick={() =>
                    document
                      .getElementById("comments_modal" + post?._id)
                      .showModal()
                  }>
                  <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {post?.comments?.length}
                  </span>
                </div>
                {/* We're using Modal Component from DaisyUI */}
                <dialog
                  id={`comments_modal${post?._id}`}
                  className="modal border-none outline-none">
                  <div className="modal-box rounded border border-gray-600">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {post?.comments?.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comments yet. Be the first 😉
                        </p>
                      )}
                      {post?.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={
                                  comment?.user?.profile?.profileImg ||
                                  "assets/avatar-placeholder.png"
                                }
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-bold">
                                {comment?.user?.fullname}
                              </span>
                              <span className="text-gray-700 text-sm">
                                @{comment?.user?.username}
                              </span>
                            </div>
                            <div className="text-sm">{comment?.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                      onSubmit={handlePostComment}>
                      <textarea
                        className="textarea sm:textarea-md w-full p-1 sm:px-2 rounded text-base resize-none border focus:outline-none  border-gray-800"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {postState.isCommenting ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          "Post"
                        )}
                      </button>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button className="outline-none">close</button>
                  </form>
                </dialog>

                <div
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleLikePost}>
                  {!postState.isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                  )}
                  {postState.isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                  )}

                  <span
                    className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                      postState.isLiked ? "text-pink-500" : ""
                    }`}>
                    {post?.likes?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default PostCard;
