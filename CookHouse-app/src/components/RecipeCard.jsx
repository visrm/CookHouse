import { useState } from "react";
import { FaRegComment, FaRegHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RECIPES_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { MdMoreVert } from "react-icons/md";
import { timestampFn } from "../utils/extractTime.js";
import ReactQuill from "react-quill";

const RecipeCard = ({ recipe }) => {
  const [review, setReview] = useState("");
  const recipeMaker = recipe?.user;

  const { user } = useSelector((store) => store.auth);
  const { loadingRecipe } = useSelector((store) => store.recipes);

  const isMyRecipe = recipeMaker?._id === user?._id || user?.role === "admin";
  const isLiked = user?.likedRecipes?.includes(recipe?._id);

  const isCommenting = loadingRecipe;

  const handleDeleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `${RECIPES_API_END_POINT}/recipe/${recipe?._id}`,
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

  const handleRecipeReview = async (e) => {
    e.preventDefault();
    try {
      let reviewData = {
        text: review,
      };
      const response = await axios.post(
        `${RECIPES_API_END_POINT}/review/${recipe?._id}`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setReview("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${RECIPES_API_END_POINT}/review/${recipe?._id}/${reviewId}`,
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
      <article className="w-[90%] sm:w-[80%] max-w-4xl mx-auto glass-morph overflow-hidden">
        <div className="flex gap-2 items-start p-4 bg-[#fdfdfd]">
          <div className="avatar h-8">
            <Link
              to={`/profile/${recipeMaker?.username}`}
              className="w-8 bg-white rounded-full overflow-hidden"
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
              {recipeMaker?.role === "user" ? (
                <Link
                  to={`/profile/${recipeMaker?.username}`}
                  className="font-bold"
                >
                  {recipeMaker?.fullname}
                </Link>
              ) : (
                "Admin"
              )}
              <span className="text-gray-700 flex gap-1 text-sm">
                {recipeMaker?.role === "user" && (
                  <Link to={`/profile/${recipeMaker?.username}`}>
                    @{recipeMaker?.username}
                  </Link>
                )}
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

            {/* Recipe Details */}
            <div className="flex flex-col gap-3 p-2 sm:p-3 transition-all duration-300 w-full max-w-[93%]">
              <div>
                <hgroup className="flex flex-row flex-wrap w-full max-w-full h-fit items-center gap-2 sm:gap-3 my-1">
                  <h1 className="font-bold text-lg sm:text-3xl text-left first-letter:capitalize font-serif">
                    {recipe?.title}
                  </h1>
                  <h3 className="font-semibold text-lg bg-slate-100 rounded-sm px-2 text-slate-700">
                    {recipe?.cuisine_type}
                  </h3>
                </hgroup>

                <ReactQuill
                  className="block h-full w-full max-w-[95%] my-1 sm:mt-2 first-letter:capitalize"
                  value={recipe?.description}
                  readOnly={true}
                  theme={null}
                />

                <div className="flex flex-row flex-wrap gap-2 items-center w-full max-w-full h-full mb-2 sm:mb-4">
                  {recipe?.dietary_tags.map((tag, id) => {
                    return (
                      <span
                        key={id}
                        className="bg-amber-100 px-4 py-1 rounded-md text-amber-800 font-medium text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {recipe?.media_url && (
                  <figure className="flex max-w-[90%] min-h-fit aspect-[16/9] mr-auto bg-[#f5f5f5]">
                    <img
                      src={recipe?.media_url}
                      className="h-80 object-contain border overflow-hidden rounded-lg border-gray-200"
                      alt="recipe-image"
                      loading="lazy"
                    />
                  </figure>
                )}
                <article className="flex flex-col flex-wrap gap-2 mt-2 sm:mt-4">
                  <div className="block p-1 sm:p-2 bg-slate-200 border border-slate-300 rounded-md w-full max-w-[66%] h-full">
                    <span className="block text-base text-left font-semibold">
                      Ingredients
                    </span>
                    <div className="flex flex-col flex-nowrap sm:gap-1 w-full text-xs sm:text-sm">
                      {recipe?.ingredients?.map((ingredient) => {
                        i++;
                        return (
                          <span
                            className="px-2 rounded-lg text-slate-700 font-medium capitalize text-wrap"
                            key={i}
                          >
                            {ingredient.trim()}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="block p-1 h-full w-full whitespace-normal">
                    <span className="block font-semibold text-lg text-left">
                      How to prepare?
                    </span>
                    <ReactQuill
                      className="block h-full w-full mb-1 sm:mb-2 first-letter:capitalize"
                      value={recipe?.instructions}
                      readOnly={true}
                      theme={null}
                    />
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
                    <h3 className="font-bold text-lg mb-3">REVIEWS</h3>
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
                                        handleDeleteReview(comment?._id);
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
                      onSubmit={handleRecipeReview}
                      id="addRecipeCommentForm"
                    >
                      <textarea
                        className="textarea sm:textarea-md w-full p-1 sm:px-2 rounded text-base resize-none border focus:outline-none  border-gray-800"
                        placeholder="Add a review..."
                        id="comment-recipe"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
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
