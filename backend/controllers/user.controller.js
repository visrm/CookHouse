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
      error: "Internal Server Error.",
    });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);
    const currentUser = await User.findById(req.id);

    if (userById.id == currentUser.id) {
      return res
        .status(400)
        .json({ error: "Users can't follow/unfollow themselves." });
    }

    if (!userById || !currentUser)
      res.status(400).json({ error: "User not found." });

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
      return res.status(200).json({
        message: "User followed successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser: ", error.message);
    res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};
