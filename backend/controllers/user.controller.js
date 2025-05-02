import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Recipe from "../models/recipe.model.js";
import Community from "../models/community.model.js";

export const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username }).select("-password");
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    return res.status(200).json({
      message: "User info fetched.",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in getProfile: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    const currentUser = await User.findById(req.id);

    if (userById._id == currentUser._id) {
      return res.status(400).json({
        message: "Users can't follow/unfollow themselves.",
        successs: false,
      });
    }

    if (!userById || !currentUser)
      res.status(400).json({ message: "User not found.", success: false });

    let isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // then unfollow user
      const removeFollower = await User.findByIdAndUpdate(id, {
        $pull: { followers: req.id },
      });
      const removeFollowing = await User.findByIdAndUpdate(req.id, {
        $pull: { following: id },
      });

      await Promise.all([removeFollower, removeFollowing]);

      return res.status(200).json({
        message: "User unfollowed successfully!",
        success: true,
      });
    } else {
      // then follow user
      const addFollower = await User.findByIdAndUpdate(id, {
        $push: { followers: req.id },
      });
      const addFollowing = await User.findByIdAndUpdate(req.id, {
        $push: { following: id },
      });
      const newNotification = new Notification({
        type: "follow",
        from: req.id,
        to: userById._id,
      });

      await Promise.all([newNotification.save(), addFollower, addFollowing]);

      // TODO return the id of the user as a response
      return res.status(200).json({
        message: "User followed successfully!",
        currentUser,
        userById,
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.id;

    const usersFollowed = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: { _id: { $ne: userId } },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowed.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));
    return res.status(200).json({
      message: "Fetched suggested users successfully.",
      suggestedUsers,
      success: true,
    });
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFollowingUsersById = async (req, res) => {
  try {
    const userId = req.params;

    const user = await User.findById(userId).sort({ createdAt: 1 }).populate({
      path: "following",
      select: "-password",
    });

    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const users = [];
    user.following.map((user) => users.push(user));

    if (users.length === 0)
      return res.status(200).json({
        message: "No following users.",
        users: [],
        success: true,
      });

    return res.status(200).json({
      message: "Following users fetched successfully.",
      users,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFollowingUsersById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFollowerUsersById = async (req, res) => {
  try {
    const userId = req.params;

    const user = await User.findById(userId).sort({ createdAt: 1 }).populate({
      path: "followers",
      select: "-password",
    });

    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const users = [];
    user.followers.map((user) => users.push(user));

    if (users.length === 0)
      return res.status(200).json({
        message: "No follower users.",
        users: [],
        success: true,
      });

    return res.status(200).json({
      message: "Follower users fetched successfully.",
      users,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFollowerUsersById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  const { username, fullname, email, currentPassword, newPassword } = req.body;
  let { profile, phoneNumber } = req.body;
  try {
    var user = await User.findById(req.id);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if ((!currentPassword && newPassword) || (currentPassword && !newPassword))
      return res.status(400).json({
        message: "Please provide both current & new password.",
        success: false,
      });

    if (currentPassword && newPassword) {
      let isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Invalid password.",
          success: false,
        });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (profile) {
      // update profileImg
      if (profile.profileImg) {
        if (user.profile.profileImg)
          await cloudinary.uploader.destroy(
            user.profile.profileImg.split("/").pop().split(".")[0]
          );

        const uploadedResponse = await cloudinary.uploader.upload(
          profile.profileImg
        );
        user.profile.profileImg = uploadedResponse.secure_url;
      }
      // update coverImg
      if (profile.coverImg) {
        if (user.profile.coverImg)
          await cloudinary.uploader.destroy(
            user.profile.coverImg.split("/").pop().split(".")[0]
          );

        const uploadedResponse = await cloudinary.uploader.upload(
          profile.coverImg
        );
        user.profile.coverImg = uploadedResponse.secure_url;
      }

      if (profile.bio) user.profile.bio = profile.bio;
      if (profile.diet_preference)
        user.profile.diet_preference = profile.diet_preference;
      if (profile.location) user.profile.location = profile.location;
    }

    if (phoneNumber) user.phoneNumber = phoneNumber;

    user.username = username || user.username;
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;

    user = await user.save();
    user.password = null;

    return res.status(200).json({
      message: "User updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const excludingLoggedUser = async (req, res) => {
  try {
    const userId = req.id;
    const users = await User.find({
      $and: [{ _id: { $ne: userId } }, { role: "user" }],
    }).select("-password");

    if (!users)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    return res.status(200).json({
      message: "User updated successfully.",
      users,
      success: true,
    });
  } catch (error) {
    console.log("Error in excludingLoggedUser: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const banUserById = async (req, res) => {
  try {
    const { id } = await req.params;
    const userId = req.id;

    const user = await User.findById(id).select("-password");
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const admin = await User.findById(userId);
    if (!admin)
      return res.status(404).json({
        message: "Admin not found.",
        success: false,
      });

    if (admin.role !== "admin")
      return res.status(400).json({
        message: "User doesn't have admin permissions. ",
        success: false,
      });

    if (admin.role === "admin") {
      // remove all user posts, recipes, owned communities
      await Post.deleteMany({ user: id });
      await Recipe.deleteMany({ user: id });
      await Community.deleteMany({ owner: id });

      //remove user from others following & followers list
      await User.updateMany({ role: "user" }, { $pull: { followers: id } });
      await User.updateMany({ role: "user" }, { $pull: { following: id } });

      // delete user profileImg & coverImg
      if (user.profile.profileImg)
        await cloudinary.uploader.destroy(
          user.profile.profileImg.split("/").pop().split(".")[0]
        );
      if (user.profile.coverImg)
        await cloudinary.uploader.destroy(
          user.profile.coverImg.split("/").pop().split(".")[0]
        );

      // delete user
      await User.findByIdAndDelete(id);
    }

    return res.status(200).json({
      message: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in banUserById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
