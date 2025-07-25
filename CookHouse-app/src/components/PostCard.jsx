import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { POSTS_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { MdMoreVert } from "react-icons/md";
import { timestampFn } from "../utils/extractTime.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const postOwner = post?.user;

  const { user } = useSelector((store) => store.auth);
  const { loadingPost } = useSelector((store) => store.posts);

  const isMyPost = postOwner?._id === user?._id || user?.role === "admin";
  const isLiked = user?.likedPosts?.includes(post?._id);

  let isCommenting = loadingPost;

  const handleDeletePost = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this post?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${POSTS_API_END_POINT}/post/${post?._id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } else {
        // User clicked Cancel
        toast.error("Deletion cancelled.");
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

  const handleDeleteComment = async (commentId) => {
    try {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${POSTS_API_END_POINT}/comment/${post?._id}/${commentId}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } else {
        // User clicked Cancel
        toast.error("Deletion cancelled.");
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
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <article className="relative w-[90%] sm:w-[80%] max-w-4xl mx-auto glass-morph overflow-hidden">
        <div className="flex flex-col flex-nowrap gap-0 items-start p-3 sm:p-4 bg-[#fdfdfd] w-full max-w-full">
          <div className="flex flex-row flex-nowrap gap-2 w-full max-w-full">
            <div className="avatar h-8">
              <Link
                to={`/profile/${postOwner?.username}`}
                className="w-8 bg-white rounded-full overflow-hidden"
              >
                <img
                  src={
                    postOwner?.profile?.profileImg ||
                    "/assets/avatar-placeholder.png"
                  }
                />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Link
                to={`/profile/${postOwner?.username}`}
                className="font-semibold"
              >
                {postOwner?.fullname}
              </Link>
              <span className="text-gray-700 flex gap-1 text-xs sm:text-sm items-center">
                <Link to={`/profile/${postOwner?.username}`}>
                  @{postOwner?.username}
                </Link>
                <span>·</span>
                <span>
                  {timestampFn(post?.createdAt) === 0
                    ? "Today"
                    : `${timestampFn(post?.createdAt)} days ago`}
                </span>
              </span>
              {isMyPost && (
                <div className="absolute top-2 right-2 flex justify-end flex-1 dropdown dropdown-start">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm border-0"
                  >
                    <MdMoreVert className="h-5 w-4 rounded" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content border-1 border-slate-200 rounded-box z-1 mt-10 w-40 p-1 shadow-sm bg-[#fdfdfd]"
                  >
                    <li>
                      <span
                        className="flex place-items-center gap-1 hover:text-red-500 cursor-pointer font-semibold"
                        onClick={handleDeletePost}
                      >
                        <FaTrash className="h-3 w-3" />
                        Delete
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 ml-4 sm:ml-6 md:ml-8">
            {/* Post Contents */}
            <div className="flex flex-col w-full max-w-full sm:w-fit text-sm sm:text-base lg:text-lg overflow-hidden">
              {post?.text && (
                <div className="block h-full w-full pr-2 sm:pr-4 text-xs sm:text-base">
                <ReactQuill
                  value={post?.text}
                  readOnly={true}
                  theme={"bubble"}
                  style={{
                    padding: "0",
                    fontSize: "1rem",
                    fontFamily: "sans-serif",
                  }}
                />
                </div>
              )}

              {post?.media_url && (
                <figure className="flex w-full max-w-full sm:max-w-[95%] min-h-fit aspect-[16/9] mr-auto bg-[#f5f5f5]">
                  <img
                    src={post?.media_url}
                    className="h-80 object-contain border overflow-hidden rounded-lg border-gray-200"
                    alt="post image"
                    loading="lazy"
                  />
                </figure>
              )}
              {post?.video_url && (
                <div className="flex w-full max-w-full sm:max-w-[95%] h-fit aspect-[16/9] mr-auto my-2 bg-[#f5f5f5]">
                  <video
                    src={post?.video_url}
                    className="h-full object-contain border overflow-hidden rounded-lg border-gray-200"
                    alt="post video"
                    controls
                  />
                </div>
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
                  }
                >
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {post?.comments?.length}
                  </span>
                </div>

                {/* We're using Modal Component from DaisyUI */}
                <dialog
                  id={`comments_modal${post?._id}`}
                  className="modal border-none outline-none"
                >
                  <div className="modal-box flex flex-col flex-nowrap flex-between w-full h-[66%] rounded border-0">
                    <form method="dialog" id="closeCommentModal">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg mb-3">COMMENTS</h3>
                    <div className="flex flex-col gap-3 h-[50%]">
                      {post?.comments?.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comments yet. Be the first 😉
                        </p>
                      )}
                      {post?.comments.map((comment) => {
                        const isMyComment = comment?.user?._id === user?._id;
                        return (
                          <div
                            key={comment._id}
                            className="flex gap-2 items-start"
                          >
                            {/* Comment header */}
                            <div className="avatar h-8">
                              <div className="w-8 rounded-full">
                                <img
                                  src={
                                    comment?.user?.profile?.profileImg ||
                                    "/assets/avatar-placeholder.png"
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
                              {/* Comment text */}
                              <div className="text-sm">{comment?.text}</div>
                            </div>
                            {isMyComment && (
                              <div className="flex justify-end flex-1 dropdown dropdown-top">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className="btn btn-sm border-0 rounded-full"
                                >
                                  <MdMoreVert className="h-3 w-3 rounded-full" />
                                </div>
                                <ul
                                  tabIndex={0}
                                  className="menu dropdown-content border-1 border-slate-200 rounded-box z-1 w-34 p-0.5 mb-2 shadow-sm bg-[#fdfdfd]"
                                >
                                  <li>
                                    <span
                                      className="flex place-items-center gap-1 hover:text-red-500 cursor-pointer text-sm font-semibold"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteComment(comment?._id);
                                      }}
                                    >
                                      <FaTrash className="h-3 w-3" />
                                      Delete
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <form
                      className="flex flex-col gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                      onSubmit={handlePostComment}
                      id="add-Post-Comment-Form"
                    >
                      <textarea
                        className="textarea sm:textarea-md w-full p-1 sm:px-2 rounded text-base resize-none border focus:outline-none  border-gray-800"
                        placeholder="Add a comment..."
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button className="btn border-0 bg-indigo-600 rounded-sm btn-sm text-[#ffffff] px-4 mr-auto">
                        {isCommenting ? (
                          <span className="loading loading-spinner loading-md"></span>
                        ) : (
                          "Post"
                        )}
                      </button>
                    </form>
                  </div>
                  <form
                    method="dialog"
                    className="modal-backdrop"
                    id="closeCommentModal2"
                  >
                    <button className="outline-none">close</button>
                  </form>
                </dialog>

                <div
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleLikePost}
                >
                  {!isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                  )}
                  {isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                  )}

                  <span
                    className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                      isLiked ? "text-pink-500" : ""
                    }`}
                  >
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
