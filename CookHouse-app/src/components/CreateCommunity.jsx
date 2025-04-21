import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingCommunity } from "../redux/slices/community.slice.js";
import { setSelfCommunity } from "../redux/slices/user.slice.js";
import toast from "react-hot-toast";
import { COMMUNITIES_API_END_POINT } from "../utils/constants.js";

const CreateCommunity = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log({ ...input, [event.target.name]: event.target.value });
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      dispatch(setLoadingCommunity(true));
      let communityInfo = {
        name: input.name,
        description: input.description,
        owner: user?._id,
      };

      const response = await axios.post(
        `${COMMUNITIES_API_END_POINT}/create`,
        communityInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setSelfCommunity(response.data.community));
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoadingCommunity(false));
      setInput({
        name: "",
        description: "",
      });
    }
  };

  return (
    <>
      <section className="sm:fixed sm:top-0 sm:left-0 md:mx-4 grid place-content-center max-w-full w-full h-screen min-h-[90svh] md:min-h-screen">
        <article className="p-4 bg-[#fdfdfd] rounded-xl md:px-6 lg:px-8 text-left w-96 max-h-full">
          <form
            method="POST"
            className="block min-w-72 w-full md:min-h-74 h-full text-base"
            onSubmit={handleSubmit}
          >
            <h2 className="block font-bold text-xl my-1 sm:my-2 mx-auto">Add Community</h2>
            <label htmlFor="name" className="block font-semibold text-sm">
              Name :
            </label>
            <textarea
              className="rounded-md textarea-md min-h-8 h-11 w-full p-1 sm:p-2 text-lg resize-none border focus:outline-none border-black/50 bg-white/50 overflow-hidden"
              placeholder="Community Name"
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              maxLength={"40ch"}
              required
            />

            <label
              htmlFor="description"
              className="block font-semibold text-sm"
            >
              Description :
            </label>
            <textarea
              className="rounded-md textarea-md min-h-18 w-full p-1 sm:p-2 text-base resize-none border focus:outline-none border-black/50 bg-white/50"
              placeholder="Desciption"
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              maxLength={"500ch"}
              required
            />
            <button type="submit" className="submit-btn">
              Create
            </button>
          </form>
        </article>
      </section>
    </>
  );
};

export default CreateCommunity;
