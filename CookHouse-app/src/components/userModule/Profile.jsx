import { MdOutlineModeEdit } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import { useGetLikedPosts } from "../Hooks/useGetLikedPosts.jsx";
import useGetUserPosts from "../Hooks/useGetUserPosts.jsx";

import ProfileSkeleton from "../Skeleton/ProfileSkeleton.jsx";
import PostsCard from "../PostsCard.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";

const EditProfileModal = () => {
  const { user } = useSelector((store) => store.auth);

  const [userData, setUserData] = useState({
    username: user?.username || "",
    fullname: user?.fullname || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = async (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateInfo = {
      username: userData.username,
      fullname: userData.fullname,
      email: userData.email,
      currentPassword: userData.currentPassword,
      newPassword: userData.newPassword,
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
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error);
    } finally {
      setUserData({
        username: user?.username || "",
        fullname: user?.fullname || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-sm"
        onClick={() => document.getElementById("editModal").showModal()}>
        Edit Profile
      </button>
      <dialog id="editModal" className="modal">
        <div className="modal-box w-102">
          <form method="dialog" id="handleClose">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setUserData({
                  username: user?.username || "",
                  fullname: user?.fullname || "",
                  email: user?.email || "",
                  currentPassword: "",
                  newPassword: "",
                });
              }}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg md:text-xl">Edit Profile</h3>
          <form
            method="PATCH"
            className="flex flex-col flex-[2_2_0] flex-wrap gap-1"
            id="handlePatch"
            onSubmit={handleSubmit}>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="fullname">
                Fullname:
              </label>
              <input
                type="text"
                className="input font-medium"
                placeholder="Fullname"
                id="fullname"
                name="fullname"
                value={userData.fullname}
                pattern="[A-Za-z]*"
                maxLength={30}
                title="Only letters"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="username">
                Username:
              </label>
              <input
                type="input"
                className="input font-medium"
                placeholder="Username"
                id="username"
                name="username"
                value={userData.username}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
                autoComplete="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                className="input font-medium"
                placeholder="Email Address"
                id="email"
                name="email"
                value={userData.email}
                autoComplete="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="CrPassword">
                Current Password:
              </label>
              <input
                type="password"
                className="input font-medium"
                id="CrPassword"
                name="currentPassword"
                value={userData.currentPassword}
                maxLength={20}
                autoComplete="new-password"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="w-fit font-base text-sm" htmlFor="NwPassword">
                New Password:
              </label>
              <input
                type="password"
                className="input font-medium"
                id="NwPassword"
                name="newPassword"
                value={userData.newPassword}
                maxLength={20}
                autoComplete="new-password"
                onChange={handleChange}
              />
            </div>
            <button className="btn max-w-fit" type="submit">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

const Profile = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { loading, user } = useSelector((store) => store.auth);
  const { fetching, likedPosts } = useSelector((store) => store.posts);
  const { selfPosts } = useSelector((store) => store.users);
  useGetLikedPosts(user?._id);
  useGetUserPosts(user?.username);

  const isMyProfile = true;

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
        profileImg: profileImg,
        coverImg: coverImg,
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
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
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
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
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
  // console.log(user?._id);
  return (
    <>
      <main className="w-full max-w-6xl md:max-w-full min-h-[90svh] md:min-h-screen">
        {/* User Profile Details*/}
        {loading && <ProfileSkeleton />}
        {!loading && user && (
          <section className="flex flex-col flex-nowrap flex-[4_4_0] gap-1 w-full max-w-full transition-all duration-300">
            <div className="relative block h-fit">
              <img
                src={user?.profile?.coverImg || coverImg || "/assets/cover.png"}
                className="object-cover w-full max-h-56 z-0"
              />
              <span className="absolute bottom-1 right-1 rounded-full truncate flex place-items-center h-7.5 w-8 hover:scale-105 bg-transparent hover:border-slate-500 hover:bg-slate-200">
                {isMyProfile && (
                  <MdOutlineModeEdit
                    className="h-6 w-6 mx-auto cursor-pointer text-white hover:text-slate-800"
                    onClick={() => coverImgRef.current.click()}
                  />
                )}
              </span>
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
              <div className="avatar avatar-online absolute block left-4 -bottom-16 z-0">
                <div className="relative w-28 sm:w-28 md:w-36 ring-green-500 ring-offset-base-100 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      user?.profile?.profileImg ||
                      profileImg ||
                      "/assets/avatar-placeholder.png"
                    }
                  />
                </div>
                {isMyProfile && (
                  <span
                    className="absolute bottom-0 left-[75%] rounded-full truncate flex place-items-center h-7.5 w-8 hover:scale-105 bg-slate-600 border-2 border-slate-600 hover:bg-slate-300 hover:border-slate-300"
                    onClick={() => profileImgRef.current.click()}>
                    <MdOutlineModeEdit className="h-6 w-6 mx-auto cursor-pointer text-white hover:text-slate-800" />
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full">
              <span className="grid col-start-2 sm:col-start-2 col-span-2 py-1 text-left w-fit">
                <h1 className="flex gap-1 items-baseline text-lg font-semibold">
                  {user?.fullname}
                  <span className="text-base text-slate-800 font-medium">
                    @{user?.username}
                  </span>
                </h1>
                <div className="flex pr-1 mb-2 text-sm">
                  {user?.profile?.bio || "Add bio section."}
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500">
                    Joined{" "}
                    {getMonth(
                      user?.createdAt?.split("T")[0]?.split("-")[1].toString()
                    )}{" "}
                    {user?.createdAt?.split("T")[0]?.split("-")[0]}
                  </span>
                </div>
                <ul className="flex mt-1 sm:mt-2 md:mt-3 list-none gap-2 md:gap-3 text-sm md:text-xs text-slate-400">
                  <li>
                    <span className="px-0.5 font-sans font-semibold text-slate-800">
                      {user?.following?.length}
                    </span>{" "}
                    following{" "}
                  </li>
                  <li>
                    <span className="px-0.5 font-sans font-semibold text-slate-800">
                      {user?.followers?.length}
                    </span>{" "}
                    followers{" "}
                  </li>
                </ul>
              </span>
            </div>{" "}
          </section>
        )}

        <article className="flex ml-auto p-1 gap-1 w-fit">
          {isMyProfile && <EditProfileModal />}
          {!isMyProfile && (
            <span className="grid gap-1">
              <button
                type="button"
                className="btn btn-sm rounded-2xl btn-primary"
                onClick={() => {
                  handleFollows(user?._id);
                }}>
                Follow
              </button>
            </span>
          )}
          {(coverImg || profileImg) && (
            <button
              className="btn btn-primary btn-sm text-white px-4 ml-2"
              onClick={handleImgSubmit}>
              Update
            </button>
          )}
        </article>

        <section>
          <div className="flex w-full border-b border-gray-700 mt-4">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("posts")}>
              Posts
              {feedType === "posts" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-500 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("liked")}>
              Liked
              {feedType === "liked" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
              )}
            </div>
          </div>
          <div className="flex w-full mt-2 justify-center">
            {feedType === "posts" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {fetching && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!fetching && selfPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No Posts found.
                  </div>
                )}
                {!fetching &&
                  selfPosts.map((feed) => {
                    return (<PostsCard post={feed} key={feed?._id} />);
                  })}
              </div>
            )}
            {feedType === "liked" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                {fetching && (
                  <div className="block text-center">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                {!fetching && likedPosts.length === 0 && (
                  <div className="block text-center text-sm p-2 sm:p-4">
                    No Liked Feeds found.
                  </div>
                )}

                {!fetching &&
                  likedPosts.map((feed) => {
                    return (<PostsCard post={feed} key={feed?._id} />);
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
