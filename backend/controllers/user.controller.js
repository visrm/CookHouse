import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).select("-password");
    if (!user)
      res.status(404).json({
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
      await User.findByIdAndUpdate(id, { $pull: { followers: req.id } });
      await User.findByIdAndUpdate(req.id, { $pull: { following: id } });
      return res.status(200).json({
        message: "User unfollowed successfully!",
        success: true,
      });
    } else {
      // then follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.id } });
      await User.findByIdAndUpdate(req.id, { $push: { following: id } });
      const newNotification = new Notification({
        type: "follow",
        from: req.id,
        to: userById.id,
      });
      await newNotification.save();

      // TODO return the id of the user as a response
      return res.status(200).json({
        message: "User followed successfully!",
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

    // update profileImg
    if (profile) {
      if (profile.profileImg) {
        if (user.profile.profileImg)
          await cloudinary.uploader.destroy(
            user.profile.profileImg.split("/").pop().split(".")[0]
          );

        const uploadedResponse = await cloudinary.uploader.upload(
          profile.profileImg
        );
        profile.profileImg = uploadedResponse.secure_url;
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
        profile.coverImg = uploadedResponse.secure_url;
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
    user.phoneNumber = phoneNumber || user.phoneNumber;

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
