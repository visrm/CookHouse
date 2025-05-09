import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import {
  POSTS_API_END_POINT,
  RECIPES_API_END_POINT,
} from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CreateEvent from "./CreateEvent";
import { setLoadingPost } from "../redux/slices/post.slice.js";
import { setLoadingRecipe } from "../redux/slices/recipe.slice";
import EmojiPicker from "emoji-picker-react";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    desc: "",
    ingredients: "",
    instructions: "",
    cuisine_type: "",
    dietary_tags: "",
  });
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const isError = false;

  const { user } = useSelector((store) => store.auth);
  const { singleCommunity } = useSelector((store) => store.communities);
  const { loadingRecipe } = useSelector((store) => store.recipes);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingRecipe(true));
    try {
      let communityId = singleCommunity._id;
      let recipeData = {
        user: user?._id,
        title: recipe.title,
        description: recipe.desc,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cuisine_type: recipe.cuisine_type,
        dietary_tags: recipe.dietary_tags,
        media_url: img,
      };
      const response = await axios.post(
        `${RECIPES_API_END_POINT}/${communityId}/create`,
        recipeData,
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

      setRecipe({
        title: "",
        desc: "",
        ingredients: "",
        instructions: "",
        cuisine_type: "",
        dietary_tags: "",
      });
      setImg(null);
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

  const handleInputChange = (e) => {
    // console.log({ ...recipe, [e.target.name]: e.target.value });
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <>
      <article className="flex flex-col min-w-fit w-[75%] md:w-[50%] max-w-[90%] mx-auto">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="submit-btn transition-all duration-300"
          onClick={() => document.getElementById("addRecipeModal").showModal()}
        >
          Add Recipe
        </button>
        <dialog id="addRecipeModal" className="modal">
          <div className="modal-box flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl bg-[#fafafa] p-4 items-start gap-4 border-b border-slate-100">
            <form method="dialog" id="handleCloseRecipe">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle bg-transparent border-0 absolute right-2 top-2"
                onClick={() => {
                  setRecipe({
                    title: "",
                    desc: "",
                    ingredients: "",
                    instructions: "",
                    cuisine_type: "",
                    dietary_tags: "",
                  });
                  setImg(null);
                }}
              >
                ✕
              </button>
            </form>
            <form
              className="flex flex-col gap-0.5 w-full h-full justify-center max-w-[95%] sm:px-2"
              onSubmit={handleSubmit}
              id="handleCreateRecipe"
            >
              <h3 className="font-bold font-serif text-lg md:text-xl">
                Publish Recipe
              </h3>
              <div>
                <label htmlFor="title">Recipe title :</label>
                <textarea
                  className="rounded-md textarea-sm h-8 min-h-8 w-full p-1 sm:p-2 text-lg resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                  placeholder="Dish Name"
                  name="title"
                  id="title"
                  value={recipe.title}
                  onChange={handleInputChange}
                  maxLength={"40ch"}
                  required
                />
              </div>
              <div>
                <label htmlFor="cuisine_type">Cuisine type :</label>
                <textarea
                  className="rounded-md textarea-sm  h-8 min-h-8 w-full p-1 sm:p-2 text-lg resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                  placeholder="Cuisine type (optional)"
                  name="cuisine_type"
                  id="cuisine_type"
                  value={recipe.cuisine_type}
                  onChange={handleInputChange}
                  maxLength={"40ch"}
                />
              </div>
              <div>
                <label htmlFor="desc">Description :</label>
                <textarea
                  className="rounded-md textarea-sm h-full min-h-12 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300"
                  placeholder="Desciption"
                  name="desc"
                  id="desc"
                  value={recipe.desc}
                  onChange={handleInputChange}
                  maxLength={"500ch"}
                  required
                />
              </div>
              <div>
                <label htmlFor="ingredients">Ingredients :</label>
                <textarea
                  className="rounded-md textarea-sm h-full min-h-14 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300"
                  placeholder={`Provide Ingredients seperated by commas(",").`}
                  name="ingredients"
                  id="ingredients"
                  value={recipe.ingredients}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="instructions">Instructions :</label>
                <textarea
                  className="rounded-md textarea textarea-sm h-full min-h-20 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300"
                  placeholder={`Example Instruction: \n Fill a kettle with fresh water and bring it to a boil.\n Pour the boiling water over the tea and let it steep for the 3-5 min. `}
                  name="instructions"
                  id="instructions"
                  value={recipe.instructions}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="dietary_tags">Dietary tags :</label>
                <textarea
                  className="rounded-md textarea textarea-sm h-full min-h-6 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300"
                  placeholder={`Provide Dietary tags seperated by commas(",").`}
                  name="dietary_tags"
                  id="dietary_tags"
                  value={recipe.dietary_tags}
                  onChange={handleInputChange}
                />
              </div>
              {img && (
                <div className="relative w-72 mx-auto">
                  <IoCloseSharp
                    className="absolute top-0 right-0 text-white bg-slate-800 rounded-full w-5 h-5 cursor-pointer"
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
              <div className="relative flex justify-between border-t py-2 border-t-slate-100">
                <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center">
                  <CiImageOn
                    className="fill-slate-700 w-6 h-6 cursor-pointer"
                    onClick={() => imgRef.current.click()}
                    title="Add image"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={imgRef}
                  onChange={handleImgChange}
                />
                <button className="submit-btn text-sm px-4" type="submit">
                  {loadingRecipe ? "Publishing..." : "Publish"}
                </button>
              </div>
              {isError && (
                <div className="text-red-500">Something went wrong</div>
              )}
            </form>
          </div>
        </dialog>
      </article>
    </>
  );
};

const CreateCommunityPostAndRecipe = ({ isOwner = false }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);

  const imgRef = useRef(null);

  const isError = false;

  const { user } = useSelector((store) => store.auth);
  const { singleCommunity } = useSelector((store) => store.communities);
  const { loadingPost } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingPost(true));
    try {
      let communityId = singleCommunity._id;
      let postData = {
        user: user?._id,
        text: text,
        media_url: img,
      };
      const response = await axios.post(
        `${POSTS_API_END_POINT}/${communityId}/create`,
        postData,
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
    } finally {
      dispatch(setLoadingPost(false));
      setOpenEmoji(false)
      setText("");
      setImg(null);
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
      <article className="flex flex-col min-w-fit w-[75%] md:w-[66%] mx-auto py-2 glass-morph">
        <div className="flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl p-4 items-start gap-4 border-b border-slate-100">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={
                  user?.profile?.profileImg || "/assets/avatar-placeholder.png"
                }
              />
            </div>
          </div>
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit}
            id="handleCreateCommunityPost"
          >
            <textarea
              className="textarea sm:textarea-md w-full p-1 sm:p-2 text-base sm:text-lg resize-none border focus:outline-none bg-[#fff] border-slate-300"
              placeholder="What's happening?!"
              name="text"
              id="text-post"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {img && (
              <div className="relative w-72 mx-auto">
                <IoCloseSharp
                  className="absolute top-0 right-0 text-white bg-slate-800 rounded-full w-5 h-5 cursor-pointer"
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

            <div className="relative flex justify-between border-t py-2 border-t-slate-100">
              {openEmoji && (
                <div className="absolute bottom-[90%] md:left-[60%] z-[100]">
                  <EmojiPicker
                    onEmojiClick={(e) => setText(text + e.emoji)}
                    height="24rem"
                    width="24rem"
                  />
                </div>
              )}
              <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center">
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
              <button className="submit-btn transition-all duration-300">
                {loadingPost ? "Posting..." : "Create Post"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500">Something went wrong</div>
            )}
          </form>
          <div className="divider my-1 font-semibold">OR</div>
          <div className="block w-full">
            <div className="flex gap-2 md:gap-4">
              <CreateRecipe /> {isOwner && <CreateEvent />}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default CreateCommunityPostAndRecipe;
