import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import Community from "../models/community.model.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { media_url, video_url } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (!text && !media_url && !video_url)
      return res.status(400).json({
        message: "Post requires atleast a text or image.",
        success: false,
      });

    if (media_url) {
      const uploadedResponse = await cloudinary.uploader.upload(media_url, {
        resource_type: "image",
        upload_preset: "cookhouse-images",
      });
      media_url = uploadedResponse.secure_url;
    }

    if (video_url) {
      const uploadedResponse = await cloudinary.uploader.upload(video_url, {
        resource_type: "video",
        upload_preset: "cookhouse-videos",
      });
      video_url = uploadedResponse.secure_url;
    }

    const newPost = await Post.create({
      user: userId,
      text,
      media_url,
      video_url,
    });

    if (!newPost)
      return res.status(404).json({
        message: "Post NOT created",
        success: false,
      });

    return res.status(201).json({
      message: "Post created successfully!",
      newPost,
      success: true,
    });
  } catch (error) {
    console.log("Error in createPost: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const createCommunityPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { media_url, video_url } = req.body;
    const userId = req.id;
    const { communityId } = req.params;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    var memberId = user._id.toString();
    if (
      !community.members.includes(memberId) &&
      community.owner.toString() !== memberId
    )
      return res.status(401).json({
        message: "Unauthorised Community Post creation.",
        success: false,
      });

    if (!text && !media_url && !video_url)
      return res.status(400).json({
        message: "Post requires atleast a text or image.",
        success: false,
      });

    if (media_url) {
      const uploadedResponse = await cloudinary.uploader.upload(media_url, {
        resource_type: "image",
        upload_preset: "cookhouse-images",
      });
      media_url = uploadedResponse.secure_url;
    }

    if (video_url) {
      const uploadedResponse = await cloudinary.uploader.upload(video_url, {
        resource_type: "video",
        upload_preset: "cookhouse-videos",
      });
      video_url = uploadedResponse.secure_url;
    }

    const newPost = await Post.create({
      user: userId,
      text,
      media_url,
      video_url,
      community: communityId,
    });

    await newPost.save();

    if (!newPost)
      return res.status(404).json({
        message: "Post NOT created",
        success: false,
      });

    let postId = newPost._id;
    await Community.updateOne(
      { _id: communityId },
      { $push: { posts: postId } }
    );

    return res.status(201).json({
      message: "Post created successfully!",
      newPost,
      success: true,
    });
  } catch (error) {
    console.log("Error in createCommunityPost: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    if (!postId)
      return res.status(400).json({
        message: "Enter valid Post Id.",
        success: false,
      });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    const userLiked = post.likes.includes(userId);
    if (userLiked) {
      //unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return res.status(200).json({
        message: "Post unliked successfully.",
        success: true,
      });
    } else {
      //like post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      return res.status(200).json({
        message: "Post liked successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in likeUnlikePost: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.id;

    if (!text)
      return res.status(400).json({
        message: "Text for comment required.",
        success: false,
      });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });
    let comment = {
      user: userId,
      text,
    };
    post.comments.push(comment);
    await post.save();
    return res.status(200).json({
      message: "Comment added successfully.",
      post,
      success: true,
    });
  } catch (error) {
    console.log("Error in commentOnPost: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (!id)
      return res.status(400).json({
        message: "Provide a valid Post Id.",
        success: false,
      });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });

    let cantDeleteComment =
      post.user.toString() !== userId.toString() && user.role !== "admin";
    let isCommentor = post.comments
      .map((comment) => comment.user._id.toString() === userId.toString())
      .includes(true);

    if (cantDeleteComment && !isCommentor)
      return res.status(401).json({
        message: "Unauthorized to delete comment.",
        success: false,
      });

    post.comments.pull(id);
    await post.save();

    return res.status(200).json({
      message: "Comment deleted successfully!",
      post,
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteComment: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (!id)
      return res.status(400).json({
        message: "Provide a valid Post Id.",
        success: false,
      });

    const post = await Post.findById(id);
    if (!post)
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });

    let cantDeletePost =
      post.user.toString() !== userId.toString() && user.role !== "admin";
    if (cantDeletePost)
      return res.status(401).json({
        message: "Unauthorized to delete post.",
        success: false,
      });

    if (post.media_url) {
      const imgId = post.media_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    if (post.video_url) {
      const vidId = post.video_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(vidId);
    }

    await Community.updateOne(
      { _id: post.community },
      { $pull: { posts: id } }
    );

    await Post.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Post deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in deletePost: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const keyword = req.query.keyword || "";

    const posts = await Post.find({ text: { $regex: keyword, $options: "i" } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .populate("community");

    if (posts.length === 0)
      return res.status(200).json({
        message: "No Recipes",
        posts: [],
        success: true,
      });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getAllPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const likedPosts =
      (await Post.find({ _id: { $in: user.likedPosts } })
        .populate({
          path: "user",
          select: "-password",
        })
        .populate({
          path: "comments.user",
          select: "-password",
        })
        .populate("community")) || [];

    return res.status(200).json({
      message: "Posts fetched successfully",
      likedPosts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getLikedPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const feedPosts = await Post.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .populate("community");

    return res.status(200).json({
      message: "Posts fetched successfully",
      feedPosts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFollowingPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .populate("community");

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getUserPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getCommunityPosts = async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    const posts = await Post.find({ community: communityId })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "profile _id username",
      })
      .populate("community");

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCommunityPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getUserCommunitiesPosts = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const query = {
      $or: [{ members: { $in: user._id } }, { owner: user._id }],
    };
    const communities = await Community.find(query).populate("posts");

    var Arr = [];

    communities.map((community) => Arr.push(...community.posts));

    const communityPosts = Arr.map(async (post) => {
      const postId = post._id;
      const posts = await Post.findById(postId)
        .sort({ createdAt: -1 })
        .populate({
          path: "user",
          select: "-password",
        })
        .populate({
          path: "comments.user",
          select: "-password",
        });

      if (!posts)
        return res.status(404).json({
          message: "Post not found.",
          success: false,
        });

      return posts;
    });

    const posts = await Promise.all(communityPosts);

    if (posts.length === 0)
      return res.status(200).json({
        message: "Posts fetched successfully",
        posts: [],
        success: true,
      });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.log("Error in getUserCommunitiesPosts: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
