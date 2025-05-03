import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingCommunity,
  setSingleCommunity,
} from "../redux/slices/community.slice.js";
import { COMMUNITIES_API_END_POINT } from "../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";

const EditCommunityModal = () => {
  const { singleCommunity } = useSelector((store) => store.communities);

  const dispatch = useDispatch();

  const [communityData, setCommunityData] = useState({
    name: singleCommunity?.name || "",
    description: singleCommunity?.description || "",
  });

  const handleChange = async (e) => {
    setCommunityData({ ...communityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (communityId) => {
    let updateInfo = {
      name: communityData.name,
      description: communityData.description,
    };
    try {
      dispatch(setLoadingCommunity(true));
      const response = await axios.patch(
        `${COMMUNITIES_API_END_POINT}/update/${communityId}`,
        updateInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setSingleCommunity(response.data.community));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingCommunity(false));
      setCommunityData({
        name: singleCommunity?.name || "",
        description: singleCommunity?.description || "",
      });
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <button
        className="btn btn-sm hover:text-indigo-500 border"
        onClick={() => document.getElementById("editModal").showModal()}
      >
        Edit Community
      </button>
      <dialog id="editModal" className="modal block mx-auto">
        <div className="modal-box w-full mt-8">
          <form method="dialog" id="handleCloseCommunity">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setCommunityData({
                  name: singleCommunity?.name || "",
                  description: singleCommunity?.description || "",
                });
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold font-serif text-lg md:text-xl">
            Edit Community
          </h3>
          <form
            method="PATCH"
            className="flex flex-col flex-[2_2_0] flex-wrap gap-1"
            id="handlePatchCommunity"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(singleCommunity?._id);
              document.getElementById("editModal").close();
            }}
          >
            <div>
              <label className="w-fit font-base text-sm" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                className="input font-medium w-full focus:outline-0 input-sm bg-[#fdfdfd]"
                placeholder="Community Name"
                id="name"
                name="name"
                value={communityData.name}
                pattern="[A-Z a-z]*"
                maxLength={40}
                title="Only letters"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="description">
                Description:
              </label>
              <input
                type="input"
                className="input font-medium w-full focus:outline-0 input-sm bg-[#fdfdfd]"
                placeholder="Description"
                id="description"
                name="description"
                value={communityData.description}
                minLength={3}
                maxLength={500}
                autoComplete="name"
                onChange={handleChange}
              />
            </div>
            <button className="btn max-w-fit mt-2" type="submit">
              Update
            </button>
          </form>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          id="handleCloseCommunity2"
        >
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditCommunityModal;
