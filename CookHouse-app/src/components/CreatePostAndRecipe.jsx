import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { POSTS_API_END_POINT, RECIPES_API_END_POINT } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoadingRecipe } from "../redux/slices/recipe.slice.js";
import { setLoadingPost } from "../redux/slices/post.slice.js";

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

  const isPending = false;
  const isError = false;

  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingRecipe(true))
    try {
      let recipeData = {
        user: user?._id,
        title: recipe.title,
        description: recipe.desc,
        ingredients: recipe.ingredients.split(","),
        instructions: recipe.instructions.split("."),
        cuisine_type: recipe.cuisine_type,
        dietary_tags: recipe.dietary_tags.split(","),
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
    dispatch(setLoadingRecipe(false))
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
          className="btn btn-sm text-amber-800 bg-amber-100 border-0 font-semibold hover:scale-105  hover:rounded-xs transition-all duration-300"
          onClick={() => document.getElementById("addRecipeModal").showModal()}
        >
          Add Recipe
        </button>
        <dialog id="addRecipeModal" className="modal">
          <div className="modal-box flex flex-col flex-nowrap my-2 sm:my-3 md:my-6 lg:my-8 w-full rounded-xl bg-amber-200 p-4 items-start gap-4 border-b border-gray-100">
            <form method="dialog" id="handleCloseRecipe">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
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
              className="flex flex-col gap-2 w-full h-full"
              onSubmit={handleSubmit}
              id="handleCreateRecipe"
            >
              <h3 className="font-bold font-serif text-lg md:text-xl">Publish Recipe</h3>
              <textarea
                className="rounded-md textarea-sm h-8 min-h-8 w-full p-1 sm:p-2 text-lg resize-none border-none focus:outline-none bg-amber-50 border-gray-200 overflow-hidden"
                placeholder="Dish Name"
                name="title"
                value={recipe.title}
                onChange={handleInputChange}
                maxLength={"40ch"}
                required
              />
                 <textarea
                className="rounded-md textarea-sm  h-8 min-h-8 w-full p-1 sm:p-2 text-lg resize-none border-none focus:outline-none bg-amber-50 border-gray-200 overflow-hidden"
                placeholder="Cuisine type (optional)"
                name="cuisine_type"
                value={recipe.cuisine_type}
                onChange={handleInputChange}
                maxLength={"40ch"}
              />
              <textarea
                className="rounded-md textarea-sm h-full min-h-15 w-full p-1 sm:p-2 text-base resize-none border-none focus:outline-none bg-amber-50 border-gray-200"
                placeholder="Desciption"
                name="desc"
                value={recipe.desc}
                onChange={handleInputChange}
                maxLength={"500ch"}
                required
              />
              <textarea
                className="rounded-md textarea-sm h-full min-h-15 w-full p-1 sm:p-2 text-base resize-none border-none focus:outline-none bg-amber-50 border-gray-200"
                placeholder={`Provide Ingredients seperated by commas(",").`}
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleInputChange}
                required
              />
              <textarea
                className="rounded-md textarea textarea-sm h-full min-h-22 w-full p-1 sm:p-2 text-base resize-none border-none focus:outline-none bg-amber-50 border-gray-200"
                placeholder={`Example Instruction: \n Fill a kettle with fresh water and bring it to a boil.\n Pour the boiling water over the tea and let it steep for the 3-5 min. `}
                name="instructions"
                value={recipe.instructions}
                onChange={handleInputChange}
                required
              />
              <textarea
                className="rounded-md textarea textarea-sm h-full min-h-15 w-full p-1 sm:p-2 text-base resize-none border-none focus:outline-none bg-amber-50 border-gray-200"
                placeholder={`Provide Dietary tags seperated by commas(",").`}
                name="dietary_tags"
                value={recipe.dietary_tags}
                onChange={handleInputChange}
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
                    className="fill-indigo-600 w-6 h-6 cursor-pointer"
                    onClick={() => imgRef.current.click()}
                    title="Add image"
                  />
                  <BsEmojiSmileFill
                    className="fill-indigo-600 w-5 h-5 cursor-pointer"
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
                <button
                  className="btn border-0 bg-indigo-600 rounded-full btn-sm text-white px-4"
                  type="submit"
                >
                  {isPending ? "Publishing..." : "Publish"}
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

  const imgRef = useRef(null);

  const isPending = false;
  const isError = false;

const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingPost(true))
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
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    dispatch(setLoadingPost(false))
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
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit}
            id="handleCreatePost"
          >
            <textarea
              className="textarea sm:textarea-md w-full p-1 sm:p-2 text-base sm:text-lg resize-none border-none focus:outline-none bg-amber-50 border-gray-200"
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
                  className="fill-indigo-600 w-6 h-6 cursor-pointer"
                  onClick={() => imgRef.current.click()}
                  title="Add image"
                />
                <BsEmojiSmileFill
                  className="fill-indigo-600 w-5 h-5 cursor-pointer"
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
              <button className="btn border-0 text-amber-800 bg-amber-100 btn-sm px-4 font-semibold hover:scale-105 hover:rounded-xs transition-all duration-300">
                {isPending ? "Posting..." : "Create Post"}
              </button>
            </div>
            {isError && (
              <div className="text-red-500">Something went wrong</div>
            )}
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
