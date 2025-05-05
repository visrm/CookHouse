import { MdOutlineModeEdit, MdOutlineRefresh } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { useGetLikedPosts } from "../Hooks/useGetLikedPosts.jsx";
import useGetUserPosts from "../Hooks/useGetUserPosts.jsx";
import useGetUserRecipes from "../Hooks/useGetUserRecipes.jsx";

import ProfileSkeleton from "../Skeleton/ProfileSkeleton.jsx";
import PostsCard from "../PostCard.jsx";
import RecipesCard from "../RecipeCard.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";
import toast from "react-hot-toast";
import { setLoading, setSingleUser } from "../../redux/slices/user.slice.js";
import { getMonth } from "../../utils/extractTime.js";
import EditProfileModal from "../EditProfileModal.jsx";
import { setUser } from "../../redux/slices/auth.slice.js";

const Profile = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const [singleUserProfile, setSingleUserProfile] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const params = useParams();
  var userName = params.userName;

  const { user } = useSelector((store) => store.auth);
  const { loadingPost, likedPosts } = useSelector((store) => store.posts);
  const { loading, singleUser, selfPosts, selfRecipes } = useSelector(
    (store) => store.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    userName = params.userName;
    (async function FetchUserInfo() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `${USERS_API_END_POINT}/profile/${userName}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setSingleUser(response.data.user));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [userName, singleUserProfile]);

  // console.log(user);
  useGetUserPosts(userName);
  useGetUserRecipes(userName);

  const isMyProfile = user?._id.toString() === singleUser?._id.toString();
  const isFollowing = user?.following.includes(singleUser?._id);

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
      profile: {
        profileImg,
        coverImg,
      },
    };
    try {
      const response = await axios.patch(
        `${USERS_API_END_POINT}/update`,
        updateInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setSingleUserProfile({});
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCoverImg(null);
      setProfileImg(null);
    }
  };

  const handleFollows = async (userId) => {
    try {
      const response = await axios.post(
        `${USERS_API_END_POINT}/follow/${userId}`,
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
        dispatch(setUser(response.data.currentUser));
        setSingleUserProfile({});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // console.log(user?._id);
  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setSingleUserProfile({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const refreshAnimate = isRefreshing ? "rotate-360" : "";

  return (
    <>
      <main className="w-full max-w-6xl md:max-w-full min-h-[90svh] md:min-h-screen transition-all duration-300">
        {/* User Profile Details*/}
        {loading && <ProfileSkeleton />}
        {!loading && singleUser && (
          <section className="flex flex-col flex-nowrap flex-[4_4_0] gap-1 w-full max-w-full transition-all duration-300">
            <div className="relative block h-fit">
              <img
                src={
                  coverImg ||
                  singleUser?.profile?.coverImg ||
                  "/assets/cover.png"
                }
                className="object-cover w-full max-h-56 z-0"
              />
              {isMyProfile && (
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
                      singleUser?.profile?.profileImg ||
                      "/assets/avatar-placeholder.png"
                    }
                  />
                </div>
                {isMyProfile && (
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
                <h1 className="flex gap-1 items-baseline text-xl font-semibold">
                  {singleUser?.fullname}
                  <span className="text-lg text-slate-800 font-medium">
                    @{singleUser?.username}
                  </span>
                </h1>
                <div className="flex flex-col flex-nowrap gap-0 pr-1 mb-2 text-sm">
                  <span className="font-semibold">About me :</span>
                  <p>{singleUser?.profile?.bio}</p>
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">
                    Joined{" "}
                    {getMonth(
                      singleUser?.createdAt
                        ?.split("T")[0]
                        ?.split("-")[1]
                        .toString()
                    )}{" "}
                    {singleUser?.createdAt?.split("T")[0]?.split("-")[0]}
                  </span>
                </div>
                <ul className="flex mt-1 sm:mt-2 md:mt-3 list-none gap-2 md:gap-3 text-sm md:text-xs text-slate-400">
                  <li>
                    <span className="px-0.5 font-sans font-semibold text-slate-800">
                      {singleUser?.following.length}
                    </span>{" "}
                    following{" "}
                  </li>
                  <li>
                    <span className="px-0.5 font-sans font-semibold text-slate-800">
                      {singleUser?.followers.length}
                    </span>{" "}
                    followers{" "}
                  </li>
                </ul>
              </span>
            </div>{" "}
          </section>
        )}

        {!loading && singleUser && (
          <div className="block p-2 md:p-3 bg-[#fafafa]">
            <div className="flex mr-1 px-1 gap-1 sm:gap-2 lg:gap-3 w-full">
              {isMyProfile && (
                <div className="w-full flex flex-end bg-[#fafafa] my-auto">
                  <EditProfileModal />
                </div>
              )}
              {!isMyProfile && (
                <button
                  type="button"
                  className="btn btn-sm amber-gradient text-[#fff] font-semibold border-0 w-fit ml-auto my-auto"
                  onClick={() => {
                    handleFollows(singleUser?._id);
                  }}
                >
                  {isFollowing ? "Follow" : "Unfollow"}
                </button>
              )}
              {(coverImg || profileImg) && (
                <div
                  className="bg-[#fafafa] my-auto tooltip tooltip-top"
                  data-tip="Update pictures"
                >
                  <button
                    className="btn amber-gradient text-[#fff] font-semibold border-0 btn-sm px-4 w-fit"
                    onClick={handleImgSubmit}
                  >
                    Update
                  </button>
                </div>
              )}
              <div
                className="bg-[#fafafa] my-auto tooltip tooltip-top"
                data-tip="Refresh"
              >
                <button
                  className="flex items-center rounded-full w-fit hover:text-indigo-600 bg-indigo-200 p-1.5"
                  onClick={handleRefresh}
                >
                  <MdOutlineRefresh
                    className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        <section>
          <div className="sticky top-12 md:top-15 flex w-full font-semibold shadow-md z-50 bg-[#fafafa]">
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
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("recipes")}
            >
              Recipes
              {feedType === "recipes" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            {isMyProfile && (
              <div
                className="flex justify-center flex-1 p-3 text-slate-500 transition duration-300 relative cursor-pointer"
                onClick={() => setFeedType("liked")}
              >
                Liked
                {feedType === "liked" && (
                  <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
                )}
              </div>
            )}
          </div>
          <div className="flex w-full mt-2 justify-center min-h-screen">
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loading && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loading && selfPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No Posts found.
                  </div>
                )}
                {!loading &&
                  selfPosts.map((feed) => {
                    return <PostsCard post={feed} key={feed?._id} />;
                  })}
              </div>
            )}
            {feedType === "recipes" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loading && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loading && selfRecipes.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No Recipes found.
                  </div>
                )}
                {!loading &&
                  selfRecipes.map((recipe) => {
                    return <RecipesCard recipe={recipe} key={recipe?._id} />;
                  })}
              </div>
            )}
            {feedType === "liked" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {loadingPost && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!loadingPost && likedPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No Liked Feeds found.
                  </div>
                )}

                {!loadingPost &&
                  likedPosts.map((feed) => {
                    return <PostsCard post={feed} key={feed?._id} />;
                  })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
