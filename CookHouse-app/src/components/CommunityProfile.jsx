import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setLoadingCommunity,
  setSingleCommunity,
} from "../redux/slices/community.slice.js";
import axios from "axios";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import ProfileSkeleton from "./Skeleton/ProfileSkeleton.jsx";
import CommunityPosts from "./CommunityPosts.jsx";
import toast from "react-hot-toast";
import { COMMUNITIES_API_END_POINT } from "../utils/constants.js";
import CommunityRecipes from "./CommunityRecipes.jsx";

const CommunityProfile = () => {
  const [feedType, setFeedType] = useState("posts");
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const params = useParams();
  var communityId = params.communityId;

  const { user } = useSelector((store) => store.auth);
  const { loadingCommunity, singleCommunity } = useSelector(
    (store) => store.communities
  );

  const dispatch = useDispatch();
  useEffect(() => {
    communityId = params.communityId;
    (async function FetchCommunityInfo() {
      try {
        dispatch(setLoadingCommunity(true));
        const response = await axios.get(
          `${COMMUNITIES_API_END_POINT}/get/${communityId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSingleCommunity(response.data.community));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingCommunity(false));
      }
    })();
  }, []);

  let isMyCommunity = false;
  if (user?._id.toString() === singleCommunity?.owner?._id.toString()) {
    isMyCommunity = true;
  }

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    let updateInfo = {
      profileImg,
      coverImg,
    };
    try {
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
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCoverImg(null);
      setProfileImg(null);
    }
  };

  const getMonth = (str) => {
    switch (str) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  };

  return (
    <>
      <main className="w-full max-w-6xl md:max-w-full min-h-[90svh] md:min-h-screen">
        {/* User Profile Details*/}
        {loadingCommunity && <ProfileSkeleton />}
        {!loadingCommunity && singleCommunity && (
          <section className="flex flex-col flex-nowrap flex-[4_4_0] gap-1 w-full max-w-full transition-all duration-300">
            <div className="relative block h-fit">
              <img
                src={
                  coverImg || singleCommunity?.coverImg || "/assets/cover.png"
                }
                className="object-cover w-full max-h-56 z-0"
              />
              {isMyCommunity && (
                <span className="absolute bottom-1 right-1 rounded-full truncate flex place-items-center h-7.5 w-8 hover:scale-105 border-slate-500 bg-slate-200">
                  <MdOutlineModeEdit
                    className="h-6 w-6 mx-auto cursor-pointer text-slate-800"
                    onClick={() => coverImgRef.current.click()}
                  />
                </span>
              )}
              {/* User Inputs for profileImg & coverImg */}
              <input
                type="file"
                accept="image/*"
                hidden
                ref={coverImgRef}
                onChange={(e) => handleImgChange(e, "coverImg")}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
              {/* User Avatar */}
              <div className="avatar absolute block left-4 -bottom-16 z-0">
                <div className="relative w-28 sm:w-28 md:w-36 ring-slate-400 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      profileImg ||
                      singleCommunity?.profileImg ||
                      "/assets/avatar-placeholder.png"
                    }
                  />
                </div>
                {isMyCommunity && (
                  <span
                    className="absolute bottom-0 left-[75%] rounded-full truncate flex place-items-center h-7.5 w-8 hover:scale-105 bg-slate-600 border-2 border-slate-600 hover:bg-slate-300 hover:border-slate-300"
                    onClick={() => profileImgRef.current.click()}
                  >
                    <MdOutlineModeEdit className="h-6 w-6 mx-auto cursor-pointer text-white hover:text-slate-800" />
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full bg-[#ffffff]">
              <span className="grid col-start-2 sm:col-start-2 col-span-2 py-1 text-left w-fit">
                <h1 className="flex flex-col flex-nowrap mb-2 gap-0 text-xl md:text-3xl font-semibold">
                  {singleCommunity?.name}
                  <span className="text-sm text-slate-800 font-medium">
                    {singleCommunity?.description}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">
                    creator:@{singleCommunity?.owner?.username}
                  </span>
                </h1>
                <div className="flex gap-2 items-center mb-2">
                  <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">
                    Created{" "}
                    {getMonth(
                      singleCommunity?.createdAt
                        ?.split("T")[0]
                        ?.split("-")[1]
                        .toString()
                    )}{" "}
                    {singleCommunity?.createdAt?.split("T")[0]?.split("-")[0]}
                  </span>
                </div>
              </span>
            </div>{" "}
          </section>
        )}{" "}
        {(coverImg || profileImg) && (
          <article className="flex mr-1 p-1 gap-1 w-full bg-[#ffffff]">
            <button
              className="btn bg-indigo-600 text-[#fdfdfd] border-0 btn-sm px-4 ml-auto w-fit"
              onClick={handleImgSubmit}
            >
              Update
            </button>
          </article>
        )}
        <section>
          <div className="sticky top-12 md:top-15 flex w-full font-semibold bg-[#ffffff] z-50 shadow-md">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}
            >
              Posts
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}
            >
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
          </div>
          {!loadingCommunity && singleCommunity && (
            <div className="flex w-full mt-2 justify-center">
              {feedType === "recipes" && (
                <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                  <CommunityRecipes communityId={singleCommunity?._id} />
                </div>
              )}
              {feedType === "posts" && (
                <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                  <CommunityPosts communityId={singleCommunity?._id} />
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default CommunityProfile;
