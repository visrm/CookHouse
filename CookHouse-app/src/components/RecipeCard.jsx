import { useState } from "react";
import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RECIPES_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MdMoreVert } from "react-icons/md";
import { timestampFn } from "../utils/extractTime.js";
import { setLoadingRecipe } from "../redux/slices/recipe.slice.js";

const RecipeCard = ({ recipe }) => {
  const [comment, setComment] = useState("");
  const recipeMaker = recipe?.user;
  const isLiked = false;

  const { user } = useSelector((store) => store.auth);
  const { loadingRecipe } = useSelector((store) => store.recipes);

  const dispatch = useDispatch();

  const isMyRecipe = recipeMaker?._id === user?._id || user?.role === "admin";

  const isCommenting = loadingRecipe;

  const handleDeleteRecipe = async () => {
    try {
      dispatch(setLoadingRecipe(true));
      const response = await axios.delete(
        `${RECIPES_API_END_POINT}/${recipe?._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingRecipe(false));
    }
  };

  const handleRecipeComment = async (e) => {
    e.preventDefault();
    dispatch(setLoadingRecipe(true));
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
    } finally {
      dispatch(setLoadingRecipe(false));
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      dispatch(setLoadingRecipe(true));
      const response = await axios.delete(
        `${RECIPES_API_END_POINT}/${recipe?._id}/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingRecipe(false));
    }
  };

  const handleLikeRecipe = async () => {
    try {
      dispatch(setLoadingRecipe(true));
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
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingRecipe(false));
    }
  };

  let i = 1;
  return (
    <>
      <article className="w-[90%] sm:w-[80%] mx-auto">
        <div className="flex gap-2 items-start p-4 border-b-2 border-gray-300 bg-[#fdfdfd]">
          <div className="avatar h-8">
            <Link
              to={`/profile/${recipeMaker?.username}`}
              className="w-8 rounded-full overflow-hidden"
            >
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
                className="font-bold"
              >
                {recipeMaker?.fullname}
              </Link>
              <span className="text-gray-700 flex gap-1 text-sm">
                <Link to={`/profile/${recipeMaker?.username}`}>
                  @{recipeMaker?.username}
                </Link>
                <span>·</span>
                <span>
                  {timestampFn(recipe?.createdAt) === 0
                    ? "Today"
                    : `${timestampFn(recipe?.createdAt)} days ago`}
                </span>
              </span>
              {isMyRecipe && (
                <div className=" flex justify-end flex-1 dropdown dropdown-start">
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
                        onClick={handleDeleteRecipe}
                      >
                        <FaTrash className="h-3 w-3" />
                        Delete
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

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
                      loading="lazy"
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
                            key={i}
                          >
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
                              key={i}
                            >
                              {instruction + "."}
                            </li>
                          );
                      })}
                    </ol>
                  </div>
                </article>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-around">
                <div
                  className="flex gap-1 items-center cursor-pointer group"
                  onClick={() =>
                    document
                      .getElementById("comments_modal" + recipe?._id)
                      .showModal()
                  }
                >
                  <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  <span className="text-sm text-slate-500 group-hover:text-sky-400">
                    {recipe?.comments?.length}
                  </span>
                </div>
                {/* We're using Modal Component from DaisyUI */}
                <dialog
                  id={`comments_modal${recipe?._id}`}
                  className="modal border-none outline-none"
                >
                  <div className="modal-box flex flex-col flex-nowrap flex-between w-full h-[66%] rounded border-0">
                    <form method="dialog" id="closeRecipeCommentModal">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg mb-3">COMMENTS</h3>
                    <div className="flex flex-col gap-3 h-[50%]">
                      {recipe?.comments?.length === 0 && (
                        <p className="text-sm text-slate-500">
                          No comments yet. Be the first 😉
                        </p>
                      )}
                      {recipe?.comments.map((comment) => {
                        const isMyComment = comment?.user?._id === user?._id;
                        return (
                          <div
                            key={comment._id}
                            className="flex gap-2 items-start"
                          >
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
                                      onClick={() => {
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
                      onSubmit={handleRecipeComment}
                      id="addRecipeCommentForm"
                    >
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
                  <form
                    method="dialog"
                    className="modal-backdrop"
                    id="closeRecipeCommentModal2"
                  >
                    <button className="outline-none">close</button>
                  </form>
                </dialog>

                <div
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={handleLikeRecipe}
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
