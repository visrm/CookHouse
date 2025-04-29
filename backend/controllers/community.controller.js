import Community from "../models/community.model.js";
import User from "../models/user.model.js";

import { v2 as cloudinary } from "cloudinary";

export const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.id;

    if (!name || !description) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const user = await User.findById(userId)
      .populate("profile.communities.community")
      .select("-password");

    if (!user)
      return res.status(404).json({
        message: "User NOT found.",
        success: false,
      });

    const community = await Community.create({
      owner: userId,
      name,
      description,
    });

    if (!community) {
      return res.status(400).json({
        message: "Community NOT created.",
        success: false,
      });
    }

    user.profile.communities.push({ community, role: "owner" });
    await user.save();

    return res.status(201).json({
      message: "New Community created successfully.",
      community,
      success: true,
    });
  } catch (error) {
    console.log("Error in createCommunity: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteCommunityById = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.id;

    const community = await Community.findById(communityId)
      .populate({ path: "posts", select: "-community" })
      .populate({ path: "recipes", select: "-community" })
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate({
        path: "members",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    const user = await User.findById(userId)
      .populate("profile.communities")
      .select("-password");

    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
      
    let cantDeleteCommunity =
      user._id.toString() !== community.owner._id.toString() ||
      user.role !== "admin";
    if (cantDeleteCommunity)
      return res.status(401).json({
        message: "Unauthorised Community deletion.",
        success: false,
      });

    community.posts.map(async (post) => {
      if (post.media_url) {
        const imgId = post.media_url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
    });

    community.recipes.map(async (recipe) => {
      if (recipe.media_url) {
        const imgId = post.media_url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
    });

    user.profile.communities.pull({
      community: communityId,
      role: "owner" || "user" || "admin",
    });
    await user.save();

    await Community.findByIdAndDelete(communityId);
    return res.status(200).json({
      message: "Community deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteCommunityById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const updateCommunity = async (req, res) => {
  const { name, description } = req.body;
  let { profileImg, coverImg } = req.body;
  try {
    const { communityId } = req.params;
    const userId = req.id;

    var community = await Community.findById(communityId)
      .sort({ createdAt: -1 })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });

    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (user._id.toString() !== community.owner._id.toString())
      return res.status(401).json({
        message: "Unauthorised Community Updation.",
        success: false,
      });

    // update profileImg
    if (profileImg) {
      if (community.profileImg)
        await cloudinary.uploader.destroy(
          community.profileImg.split("/").pop().split(".")[0]
        );

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      community.profileImg = uploadedResponse.secure_url;
    }
    // update coverImg
    if (coverImg) {
      if (community.coverImg)
        await cloudinary.uploader.destroy(
          community.coverImg.split("/").pop().split(".")[0]
        );

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      community.coverImg = uploadedResponse.secure_url;
    }

    community.name = name || community.name;
    community.description = description || community.description;

    community = await community.save();

    return res.status(200).json({
      message: "Community updated successfully.",
      community,
      success: true,
    });
  } catch (error) {
    console.log("Error in updateCommunityById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const communities = await Community.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });
    if (!communities) {
      return res.status(404).json({
        message: "Communities not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "communities fetched successfully.",
      communities,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCommunities: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId)
      .sort({ createdAt: -1 })
      .populate({ path: "posts", select: "-community" })
      .populate({ path: "recipes", select: "-community" })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });

    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    return res.status(200).json({
      message: "Community fetched successfully!",
      community,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCommunityById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

// for community owner
export const getOwnerCommunities = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const communities = await Community.find({ owner: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "posts", select: "-community" })
      .populate({ path: "recipes", select: "-community" })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });

    if (!communities)
      return res.status(404).json({
        message: "Communities not found.",
        success: false,
      });

    return res.status(200).json({
      message: "Communities fetched successfully!",
      communities,
      success: true,
    });
  } catch (error) {
    console.log("Error in getOwnerCommunities: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getUserCommunities = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const query = {
      $or: [{ members: { $in: userId } }, { owner: userId }],
    };

    const communities = await Community.find(query)
      .sort({ createdAt: -1 })
      .populate({ path: "posts", select: "-community" })
      .populate({ path: "recipes", select: "-community" })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });

    if (communities.length === 0)
      return res.status(200).json({
        message: "Communities fetched successfully.",
        communities: [],
        success: true,
      });

    return res.status(200).json({
      message: "Your communities fetched successfully!",
      communities,
      success: true,
    });
  } catch (error) {
    console.log("Error in getUserCommunities: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const joinUnjoinCommunityById = async (req, res) => {
  try {
    const { communityId } = req.params;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const community = await Community.findById(communityId)
      .sort({ createdAt: -1 })
      .populate({
        path: "owner",
        select: "-password -profile.communities",
      })
      .populate({
        path: "members",
        select: "-password -profile.communities",
      });

    if (!community)
      return res.status(404).json({
        message: "Communities not found.",
        success: false,
      });

    if (community.owner._id.toString() === userId.toString())
      return res.status(400).json({
        message: "You own the community.",
        success: false,
      });

    var isMemberArray = user.profile.communities.map((item) =>
      JSON.stringify(item).includes(communityId)
    );

    if (isMemberArray.includes(true)) {
      // If the user is already a member
      user.profile.communities.pull({ community: communityId, role: "member" });
      community.members.pull(userId);

      await user.save();
      await community.save();

      return res.status(200).json({
        message: "Community left successfully!",
        success: true,
      });
    } else {
      // If user isn't a member yet
      user.profile.communities.push({ community, role: "member" });
      community.members.push(userId);

      await user.save();
      await community.save();

      return res.status(200).json({
        message: "Community joined successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in joinCommunityById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
