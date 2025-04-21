import { useState } from "react";
import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RECIPES_API_END_POINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RecipeCard = ({ recipe }) => {
  const [comment, setComment] = useState("");
  const recipeMaker = recipe?.user;
  const isLiked = false;

  let isMyPost = true;

  const { user } = useSelector((store) => store.auth);
  if (recipeMaker?._id.toString() === user?._id.toString()) {
    isMyPost = true;
  } else {
    isMyPost = false;
  }

  const formattedDate = "1h";

  const isCommenting = false;

  const handleDeleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `${RECIPES_API_END_POINT}/delete/${recipe?._id}`,
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

  const handleRecipeComment = async (e) => {
    e.preventDefault();
    try {
      let commentData = {
        text: comment,
      };
      const response = await axios.post(
        `${RECIPES_API_END_POINT}/comment/${recipe?._id}`,
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

  const handleLikeRecipe = async () => {
    try {
      const response = await axios.post(
        `${RECIPES_API_END_POINT}/like/${recipe?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
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

  let i = 1;
  return (
    <>
      <article className="w-[85%] sm:w-[75%] mx-auto">
        <div className="flex gap-2 items-start p-4 border-b-2 border-gray-300 bg-[#fdfdfd]">
          <div className="avatar h-8">
            <Link
              to={`/profile/${recipeMaker?.username}`}
              className="w-8 rounded-full overflow-hidden">
              <img
                src={
                  recipeMaker?.profile?.profileImg ||
                  "/assets/avatar-placeholder.png"
                }
              />
            </Link>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-2 items-center">
              <Link
                to={`/profile/${recipeMaker?.username}`}
                className="font-bold">
                {recipeMaker?.fullname}
              </Link>
              <span className="text-gray-700 flex gap-1 text-sm">
                <Link to={`/profile/${recipeMaker?.username}`}>
                  @{recipeMaker?.username}
                </Link>
                <span>·</span>
                <span>{formattedDate}</span>
              </span>
              {isMyPost && (
                <span className="flex justify-end flex-1">
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeleteRecipe}
                  />
                </span>
              )}
            </div>

            {/* To be changed */}
            <div className="flex flex-col gap-3 p-2 sm:p-3 transition-all duration-300 w-full max-w-[93%]">
              <div>
                <h1 className="block font-semibold text-lg sm:text-xl my-2 w-full text-left first-letter:capitalize underline underline-offset-4 font-serif">
                  {recipe?.title}
                </h1>
                <span className="block text-xs sm:text-sm h-full w-full my-1 sm:my-2 first-letter:capitalize">
                  {recipe?.description}
                </span>
                {recipe?.media_url && (
                  <figure className="flex max-w-full min-h-fit aspect-[16/9] mr-auto bg-[#f5f5f5]">
                    <img
                      src={recipe?.media_url}
                      className="h-80 object-contain border overflow-hidden rounded-lg border-gray-200"
                      alt=""
                    />
                  </figure>
                )}
                <article className="flex flex-col flex-wrap md:flex-row md:flex-nowrap gap-2 mt-2">
                  <div className="block p-1 sm:p-2 bg-slate-200 border border-slate-300 rounded-md w-full min-w-fit max-w-[33%] h-full">
                    <span className="block text-base text-left font-semibold">
                      Ingredients
                    </span>
                    <div className="flex flex-col flex-nowrap sm:gap-1 w-full text-xs sm:text-sm">
                      {recipe?.ingredients?.map((ingredient) => {
                        i++;
                        return (
                          <span
                            className="px-2 rounded-lg text-slate-700 font-medium capitalize"
                            key={i}>
                            {ingredient.trim()}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="block p-1 sm:px-2 w-full h-full max-w-[75%] whitespace-normal">
                    <span className="block font-semibold text-base text-left">
                      How to prepare?
                    </span>
                    <ol className="flex flex-col flex-nowrap gap-1 w-full text-xs sm:text-sm list-decimal list-inside">
                      {recipe?.instructions.length === 0 && (
                        <li className="list-item first-letter:capitalize">
                          No Instructions provided.
                        </li>
                      )}
                      {recipe?.instructions?.map((instruction) => {
                        i++;
                        if (instruction.trim().length !== 0)
                          return (
                            <li
                              className="list-item first-letter:capitalize"
                              key={i}>
                              {instruction + "."}
                            </li>
                          );
                      })}
                    </ol>
                  </div>
                </article>
              </div>
            </div>
            {/* Till here */}

            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-around">
                <div
                  className="flex gap-1 items-center cursor-pointer group"
                  onClick={() =>
                    document
                      .getElementById("comments_modal" + recipe?._id)
                      .showModal()
                  }>
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {recipe?.comments?.length}
                  </span>
                </div>
                {/* We're using Modal Component from DaisyUI */}
                <dialog
                  id={`comments_modal${recipe?._id}`}
                  className="modal border-none outline-none">
                  <div className="modal-box rounded border-0">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg mb-3">COMMENTS</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {recipe?.comments?.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comments yet. Be the first 😉
                        </p>
                      )}
                      {recipe?.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex gap-2 items-start">
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
                            <div className="text-sm">{comment?.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      className="flex flex-col gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                      onSubmit={handleRecipeComment}>
                      <textarea
                        className="textarea sm:textarea-md w-full p-1 sm:px-2 rounded text-base resize-none border focus:outline-none  border-gray-800"
                        placeholder="Add a comment..."
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
                  <form method="dialog" className="modal-backdrop">
                    <button className="outline-none">close</button>
                  </form>
                </dialog>

                <div
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleLikeRecipe}>
                  {!isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                  )}
                  {isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                  )}

                  <span
                    className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                      isLiked ? "text-pink-500" : ""
                    }`}>
                    {recipe?.likes?.length}
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

export default RecipeCard;
