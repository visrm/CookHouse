import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setLoadingCommunity,
  setSingleCommunity,
} from "../redux/slices/community.slice.js";
import axios from "axios";
import { IoCalendarOutline } from "react-icons/io5";
import {
  MdEventNote,
  MdMoreVert,
  MdOutlineMessage,
  MdOutlineModeEdit,
  MdOutlineRefresh,
} from "react-icons/md";
import ProfileSkeleton from "./Skeleton/ProfileSkeleton.jsx";
import CommunityPosts from "./CommunityPosts.jsx";
import toast from "react-hot-toast";
import { COMMUNITIES_API_END_POINT } from "../utils/constants.js";
import CommunityRecipes from "./CommunityRecipes.jsx";
import CreateCommunityPostAndRecipe from "./CreateCommunityPostAndRecipe.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import EditCommunityModal from "./EditCommunityModal";
import CommunityEvents from "./CommunityEvents.jsx";
import { FaRegFileAlt } from "react-icons/fa";

const CommunityProfile = () => {
  const [feedType, setFeedType] = useState("posts");
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [singleCommunityProfile, setSingleCommunityProfile] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const params = useParams();
  const navigate = useNavigate();
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
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoadingCommunity(false));
      }
    })();
  }, [singleCommunityProfile]);

  const isMyCommunity = singleCommunity?.owner?._id === user?._id;

  const isJoinedCommunity =
    singleCommunity?.members
      .map((member) => member._id === user?._id)
      .includes(true) || isMyCommunity;

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

  const handleImgSubmit = async (communityId) => {
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
        setSingleCommunityProfile({});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCoverImg(null);
      setProfileImg(null);
    }
  };

  const handleJoins = async (communityId) => {
    try {
      const response = await axios.get(
        `${COMMUNITIES_API_END_POINT}/join/${communityId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSingleCommunityProfile({});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeletion = async (communityId) => {
    try {
      dispatch(setLoadingCommunity(true));
      const response = await axios.delete(
        `${COMMUNITIES_API_END_POINT}/delete/${communityId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoadingCommunity(false));
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

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setSingleCommunityProfile({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const refreshAnimate = isRefreshing ? "rotate-360" : "";

  return (
    <>
      <main className="w-full max-w-6xl md:max-w-full min-h-[90svh] md:min-h-screen transition-all duration-300 overflow-x-hidden">
        {/* User Profile Details*/}
        {loadingCommunity && <ProfileSkeleton />}
        {!loadingCommunity && singleCommunity && (
          <>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full bg-[#fafafa]">
                <span className="grid col-start-2 sm:col-start-2 col-span-2 py-1 text-left w-fit">
                  <h1 className="flex flex-col flex-nowrap mb-2 gap-0 text-xl md:text-3xl font-semibold">
                    {singleCommunity?.name}
                    <span className="text-sm text-slate-800 font-medium">
                      {singleCommunity?.description}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      Created By:{" "}
                      <span className="font-normal">
                        @{singleCommunity?.owner?.username}
                      </span>
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

            <div className="flex bg-[#fafafa] justify-center items-center w-full max-w-full p-2 md:py-4">
              <div className="stats shadow md:h-40 bg-[#fdfdfd]">
                <div className="stat">
                  <div className="stat-figure text-[#FEB340]">
                    <MdOutlineMessage className="h-9 w-9" />
                  </div>
                  <div className="stat-title md:text-base md:font-semibold">
                    Total Posts
                  </div>
                  <div className="stat-value md:text-6xl text-slate-800">
                    {singleCommunity?.posts.length}
                  </div>
                  <div className="stat-desc">
                    {getMonth(
                      singleCommunity?.createdAt
                        ?.split("T")[0]
                        ?.split("-")[1]
                        .toString()
                    )}{" "}
                    {singleCommunity?.createdAt?.split("T")[0]?.split("-")[0]} -
                    Today
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-[#FEB340]">
                    <FaRegFileAlt className="h-8 w-8" />
                  </div>
                  <div className="stat-title md:text-base md:font-semibold">
                    Total Recipes
                  </div>
                  <div className="stat-value md:text-6xl text-slate-800">
                    {singleCommunity?.recipes.length}
                  </div>
                  <div className="stat-desc">
                    {getMonth(
                      singleCommunity?.createdAt
                        ?.split("T")[0]
                        ?.split("-")[1]
                        .toString()
                    )}{" "}
                    {singleCommunity?.createdAt?.split("T")[0]?.split("-")[0]} -
                    Today
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-[#FEB340]">
                    <MdEventNote className="h-9 w-9" />
                  </div>
                  <div className="stat-title md:text-base md:font-semibold">
                    Events
                  </div>
                  <div className="stat-value md:text-6xl text-slate-800">
                    {singleCommunity?.events.length}
                  </div>
                  <div className="stat-desc">
                    {getMonth(
                      singleCommunity?.createdAt
                        ?.split("T")[0]
                        ?.split("-")[1]
                        .toString()
                    )}{" "}
                    {singleCommunity?.createdAt?.split("T")[0]?.split("-")[0]} -
                    Today
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure">
                    <div className="avatar-group -space-x-6">
                      <div className="avatar">
                        <div className="w-12">
                          <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                        </div>
                      </div>
                      <div className="avatar avatar-placeholder">
                        <div className="bg-slate-700 text-neutral-content w-12">
                          <span>+{singleCommunity?.members.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stat-value md:text-7xl text-slate-800 text-center">
                    {singleCommunity?.members.length + 1}
                  </div>
                  <div className="stat-title text-base text-center">
                    Members Count
                  </div>
                  <div className="stat-desc text-xs font-semibold font-sans bg-[#FEB340] text-white p-1.5 px-2 rounded">
                    Join Our Community!!
                  </div>
                </div>
              </div>
            </div>

            <article className="w-full flex justify-end bg-[#fafafa] transition-all duration-300 p-2 md:p-3 gap-1 sm:gap-2 lg:gap-3">
              {(coverImg || profileImg) && (
                <button
                  className="btn bg-indigo-500 text-[#fdfdfd] border rounded-full btn-sm w-fit"
                  onClick={(e) => {
                    handleImgSubmit(singleCommunity?._id);
                  }}
                >
                  Update
                </button>
              )}
              {!isMyCommunity && (
                <div>
                  <button
                    type="button"
                    className="btn btn-sm bg-indigo-500 text-[#fff] font-semibold hover:bg-indigo-600 border transition-all duration-300 amber-gradient"
                    onClick={(e) => {
                      e.preventDefault();
                      handleJoins(singleCommunity?._id);
                    }}
                    id="join-community-button"
                  >
                    {isJoinedCommunity ? "Leave Community" : "Join Community"}
                  </button>
                </div>
              )}

              {isMyCommunity && (
                <div className="flex justify-end dropdown dropdown-start dropdown-hover mx-2">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm border-0 rounded-full"
                  >
                    <MdMoreVert className="w-fit" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content border-1 border-slate-200 bg-[#fdfdfd] rounded-box z-1 mt-10 w-40 p-1 shadow-sm font-semibold"
                  >
                    <li>
                      <EditCommunityModal />
                    </li>

                    <li>
                      <button
                        className="btn hover:text-red-400 border btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletion(singleCommunity?._id);
                        }}
                      >
                        Delete Community
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </article>

            {isJoinedCommunity && (
              <div className="block w-full bg-[#fafafa]">
                <CreateCommunityPostAndRecipe isOwner={isMyCommunity} />
              </div>
            )}
          </>
        )}
        <section>
          <div className="sticky top-12 md:top-15 flex w-full font-semibold bg-[#fafafa] z-50 shadow-md">
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
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("events")}
            >
              Events
              {feedType === "events" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div className="flex justify-end transition duration-300 relative cursor-pointer">
              <div className="my-auto tooltip tooltip-left" data-tip="Refresh">
                <button
                  className="flex items-center rounded-full w-fit hover:text-indigo-600 p-1.5 sm:mr-2"
                  onClick={handleRefresh}
                >
                  <MdOutlineRefresh
                    className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
                  />
                </button>
              </div>
            </div>
          </div>
          {loadingCommunity && (
            <div className="flex w-full mt-2 justify-center min-h-screen">
              <div className="block text-center">
                <LoadingSpinner size="lg" />
              </div>
            </div>
          )}
          {!loadingCommunity && (
            <div className="flex w-full mt-2 justify-center min-h-screen">
              {feedType === "posts" && (
                <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                  {singleCommunity?.posts.length === 0 && (
                    <div className="block text-center text-sm p-2 sm:p-4">
                      No community posts found.
                    </div>
                  )}
                  {singleCommunity?.posts.length > 0 && (
                    <CommunityPosts communityId={singleCommunity?._id} />
                  )}
                </div>
              )}
              {feedType === "recipes" && (
                <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                  {singleCommunity?.recipes.length === 0 && (
                    <div className="block text-center text-sm p-2 sm:p-4">
                      No community recipes found.
                    </div>
                  )}
                  {singleCommunity?.recipes.length > 0 && (
                    <CommunityRecipes communityId={singleCommunity?._id} />
                  )}
                </div>
              )}
              {feedType === "events" && (
                <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                  {singleCommunity?.events.length === 0 && (
                    <div className="block text-center text-sm p-2 sm:p-4">
                      No Community events found.
                    </div>
                  )}
                  {singleCommunity?.events.length > 0 && (
                    <CommunityEvents communityId={singleCommunity?._id} />
                  )}
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
