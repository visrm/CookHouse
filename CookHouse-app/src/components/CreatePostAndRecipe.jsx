import { BsEmojiSmileFill } from "react-icons/bs";
import { MdOutlineImage, MdOutlineVideoLibrary } from "react-icons/md";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import {
  POSTS_API_END_POINT,
  RECIPES_API_END_POINT,
} from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoadingRecipe } from "../redux/slices/recipe.slice.js";
import { setLoadingPost } from "../redux/slices/post.slice.js";
import EmojiPicker from "emoji-picker-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "./LoadingSpinner.jsx";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    cuisine_type: "",
    dietary_tags: "",
  });
  const [desc, setDesc] = useState("");
  const [instructions, setInstructions] = useState("");
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const isError = false;

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { loadingRecipe } = useSelector((store) => store.recipes);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingRecipe(true));
    try {
      let ingredientsData = recipe.ingredients.trim().replace(/\,$/, "");
      let dietaryTagsData = recipe.dietary_tags
        .trim()
        .replace(/\,$/, "")
        .toLowerCase();
      let recipeData = {
        user: user?._id,
        title: recipe.title,
        description: desc,
        category: recipe.category,
        ingredients: ingredientsData.split(","),
        instructions: instructions.trim(),
        cuisine_type: recipe.cuisine_type,
        dietary_tags: dietaryTagsData.split(","),
        media_url: img,
      };
      const response = await axios.post(
        `${RECIPES_API_END_POINT}/create`,
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
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingRecipe(false));
      setRecipe({
        title: "",
        category: "",
        ingredients: "",
        cuisine_type: "",
        dietary_tags: "",
      });
      setDesc("");
      setInstructions("");
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
          className="submit-btn text-center transition-all duration-300"
          onClick={() => document.getElementById("addRecipeModal").showModal()}
        >
          Add Recipe
        </button>
        <dialog id="addRecipeModal" className="modal">
          <div className="modal-box flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl bg-[#fafafa] p-4 items-start gap-4 border-b border-gray-100">
            <form method="dialog" id="handleCloseRecipe">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle bg-transparent border-0 absolute right-2 top-2"
                onClick={() => {
                  setRecipe({
                    title: "",
                    category: "",
                    ingredients: "",
                    cuisine_type: "",
                    dietary_tags: "",
                  });
                  setDesc("");
                  setInstructions("");
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
                  maxLength={"75ch"}
                  required
                />
              </div>

              <div>
                <label htmlFor="cuisine_type">Cuisine type :</label>
                <select
                  className="rounded-md inline-block h-8 min-h-8 w-full px-1 sm:px-2 border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                  name="cuisine_type"
                  id="cuisine_type"
                  value={recipe.cuisine_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">None</option>
                  <option value="indian">Indian Cuisine</option>
                  <option value="american">American Cuisine</option>
                  <option value="mediterranean">Mediterranean Cuisine</option>
                  <option value="italian">Italian Cuisine</option>
                  <option value="chinese">Chinese Cuisine</option>
                  <option value="french">French Cuisine</option>
                  <option value="spanish">Spanish Cuisine</option>
                  <option value="middle-eastern">Middle Eastern Cuisine</option>
                  <option value="mexican">Mexican Cuisine</option>
                  <option value="japanese">Japanese Cuisine</option>
                  <option value="korean">Korean Cuisine</option>
                  <option value="fusion">Fusion Cuisine</option>
                  <option value="haute">Haute Cuisine</option>
                  <option value="religious">Religious Cuisine</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="category">Category :</label>
                <select
                  className="rounded-md inline-block h-8 min-h-8 w-full px-1 sm:px-2 border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                  name="category"
                  id="category"
                  value={recipe.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">None</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="appetiser">Appetiser</option>
                  <option value="salad">Salad</option>
                  <option value="soup">Soup</option>
                  <option value="snack">Snack</option>
                  <option value="main-course">Main course</option>
                  <option value="side-dish">Side dish</option>
                  <option value="drinks-beverages">Drinks/Beverages</option>
                  <option value="baked-good">Baked goods</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="meat">Meat</option>
                  <option value="sea-food">Seafood</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label htmlFor="desc">Description :</label>
                <ReactQuill
                  className="block h-full min-h-12 w-full max-w-full text-base focus:outline-none bg-[#fdfdfd] border-slate-300"
                  placeholder="Give a description of your recipe."
                  name="desc"
                  id="desc"
                  value={desc}
                  onChange={setDesc}
                  theme="snow"
                  maxLength={"500ch"}
                  required
                />
              </div>

              <div>
                <label htmlFor="ingredients">Ingredients :</label>
                <textarea
                  className="rounded-md textarea-sm h-full min-h-20 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none bg-[#fdfdfd] border-slate-300"
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
                <ReactQuill
                  className="h-full min-h-20 w-full max-w-full text-base focus:outline-none bg-[#fdfdfd] border-slate-300"
                  name="instructions"
                  id="instructions"
                  theme="snow"
                  value={instructions}
                  onChange={setInstructions}
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

              <div className="relative flex justify-between border-t py-2 border-t-gray-100">
                <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center">
                  <MdOutlineImage
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
                <button className="submit-btn px-4" type="submit">
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

const CreatePostAndRecipe = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);

  const imgRef = useRef(null);
  const videoRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const maxLimit = 5242880;

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { loadingPost } = useSelector((store) => store.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingPost(true));
    try {
      let postData = {
        user: user?._id,
        text: text,
        media_url: img,
        video_url: video,
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
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingPost(false));
      setOpenEmoji(false);
      setText("");
      setImg(null);
      setVideo(null);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      if (file.size > maxLimit) {
        toast.error("File size exceeds size limit!");
        e.target.value("");
        setImg(null);
      }
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
      };
      if (file.size > maxLimit) {
        toast.error("File size exceeds size limit!");
        e.target.value("");
        setVideo(null);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <article className="flex flex-col w-[75%] md:w-[50%] max-w-[90%] mx-auto glass-morph">
        <div className="flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl p-4 items-start gap-4 border-b border-gray-100">
          <div className="avatar">
            <div className="w-8 bg-white rounded-full">
              <img
                src={
                  user?.profile?.profileImg || "/assets/avatar-placeholder.png"
                }
              />
            </div>
          </div>
          <form
            className="flex flex-col gap-2 w-full max-w-full"
            onSubmit={handleSubmit}
            id="handleCreatePost"
          >
            <ReactQuill
              className="block h-full min-h-28 w-full max-w-full text-base sm:text-lg focus:outline-none bg-[#fff] border-slate-300"
              placeholder="What's happening?!"
              name="text"
              id="text"
              theme="snow"
              modules={modules}
              formats={formats}
              value={text}
              onChange={setText}
            />
            {img && (
              <div className="relative w-72 mx-auto transition-all duration-300">
                <IoCloseSharp
                  className="absolute top-0 right-0 text-white bg-slate-800 rounded-full w-5 h-5 cursor-pointer hover:scale-110 z-[100]"
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
            {video && (
              <div className="relative w-72 mx-auto">
                <IoCloseSharp
                  className="absolute top-0 right-0 text-white bg-slate-800 rounded-full w-5 h-5 cursor-pointer hover:scale-110 z-[100]"
                  onClick={() => {
                    setVideo(null);
                    videoRef.current.value = null;
                  }}
                />
                <video
                  src={video}
                  className="w-full mx-auto h-72 object-contain rounded"
                  controls
                />
              </div>
            )}

            <div className="relative flex justify-between border-t py-2 border-t-slate-100">
              {openEmoji && (
                <div className="absolute top-[90%] md:-left-[50%] z-[200] ">
                  <EmojiPicker
                    onEmojiClick={(e) => setText(text + e.emoji)}
                    lazyLoadEmojis={true}
                    height="24rem"
                    width="24rem"
                  />
                </div>
              )}
              <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center">
                <MdOutlineImage
                  className="fill-slate-700 w-6 h-6 cursor-pointer"
                  onClick={() => imgRef.current.click()}
                  title="Add image"
                />
                <MdOutlineVideoLibrary
                  className="fill-slate-700 w-6 h-6 cursor-pointer"
                  onClick={() => videoRef.current.click()}
                  title="Add video"
                />
                <BsEmojiSmileFill
                  className="fill-slate-700 w-5 h-5 cursor-pointer"
                  onClick={() => setOpenEmoji(!openEmoji)}
                  title="Add emoji"
                />
              </div>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                hidden
                ref={imgRef}
                onChange={handleImgChange}
              />
              <input
                id="video-input"
                type="file"
                accept="video/*"
                hidden
                ref={videoRef}
                onChange={handleVideoChange}
              />
              <button className="submit-btn transition-all duration-300">
                {loadingPost ? <LoadingSpinner size="sm" /> : "Create Post"}
              </button>
            </div>
          </form>
          <div className="divider my-1 font-semibold">OR</div>
          <div className="block w-full">
            <CreateRecipe />
          </div>
        </div>
      </article>
    </>
  );
};
export default CreatePostAndRecipe;
