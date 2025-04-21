import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";
import Notification from "../models/notification.model.js";

import { v2 as cloudinary } from "cloudinary";
import Community from "../models/community.model.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    let { media_url, cuisine_type, dietary_tags } = req.body;
    const userId = req.id;

    if (!title || !description || !ingredients || !instructions)
      return res.status(400).json({
        message: "Required field(s) missing.",
        success: false,
      });
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (media_url) {
      const uploadedResponse = await cloudinary.uploader.upload(media_url);
      media_url = uploadedResponse.secure_url;
    }

    const newRecipe = await Recipe.create({
      user: userId,
      title,
      description,
      ingredients: ingredients.split(","),
      instructions: instructions.split("."),
      media_url,
      cuisine_type,
      dietary_tags: dietary_tags.split(","),
    });

    if (!newRecipe) {
      return res.status(400).json({
        message: "Recipe NOT created.",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Recipe created successfully!",
      newRecipe,
      success: true,
    });
  } catch (error) {
    console.log("Error in createRecipe: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const createCommunityRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    let { media_url, cuisine_type, dietary_tags } = req.body;
    const userId = req.id;
    const { communityId } = req.params;

    if (!title || !description || !ingredients || !instructions)
      return res.status(400).json({
        message: "Required field(s) missing.",
        success: false,
      });
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
        message: "Unauthorised Community Recipe publication.",
        success: false,
      });

    if (media_url) {
      const uploadedResponse = await cloudinary.uploader.upload(media_url);
      media_url = uploadedResponse.secure_url;
    }

    const newRecipe = await Recipe.create({
      user: userId,
      title,
      description,
      ingredients: ingredients.split(","),
      instructions: instructions.split("."),
      media_url,
      cuisine_type,
      dietary_tags: dietary_tags.split(","),
      community: communityId,
    });

    if (!newRecipe) {
      return res.status(400).json({
        message: "Recipe NOT created.",
        success: false,
      });
    }

    let recipeId = newRecipe._id;
    await Community.updateOne(
      { _id: communityId },
      { $push: { recipes: recipeId } }
    );

    return res.status(201).json({
      message: "Recipe created successfully!",
      newRecipe,
      success: true,
    });
  } catch (error) {
    console.log("Error in createCommunityRecipe: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const likeUnlikeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.id;
    if (!recipeId)
      return res.status(400).json({
        message: "Enter valid recipe Id.",
        success: false,
      });

    const recipe = await Recipe.findById(recipeId);
    if (!recipe)
      return res.status(404).json({
        message: "Recipe not found.",
        success: false,
      });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const userLiked = recipe.likes.includes(userId);
    if (userLiked) {
      //unlike recipe
      await Recipe.updateOne({ _id: recipeId }, { $pull: { likes: userId } });
      await User.updateOne(
        { _id: userId },
        { $pull: { likedRecipes: recipeId } }
      );
      res.status(200).json({
        message: "recipe unliked successfully.",
        success: true,
      });
    } else {
      //like recipe
      recipe.likes.push(userId);
      await User.updateOne(
        { _id: userId },
        { $push: { likedRecipes: recipeId } }
      );
      await recipe.save();

      const notification = new Notification({
        from: userId,
        to: recipe.user,
        type: "like",
      });
      await notification.save();

      res.status(200).json({
        message: "Recipe liked successfully.",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in likeUnlikeRecipe: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const commentOnRecipe = async (req, res) => {
  try {
    const { text } = req.body;
    const recipeId = req.params.id;
    const userId = req.id;

    if (!text)
      return res.status(400).json({
        message: "Text for comment required.",
        success: false,
      });

    const recipe = await Recipe.findById(recipeId);
    if (!recipe)
      return res.status(404).json({
        message: "recipe not found.",
        success: false,
      });
    let comment = {
      user: userId,
      text,
    };
    recipe.comments.push(comment);
    await recipe.save();
    return res.status(200).json({
      message: "Comment added successfully.",
      recipe,
      success: true,
    });
  } catch (error) {
    console.log("Error in commentOnRecipe: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        message: "Provide a valid recipe Id.",
        success: false,
      });

    const recipe = await Recipe.findById(id);
    if (!recipe)
      return res.status(404).json({
        message: "recipe not found.",
        success: false,
      });

    if (recipe.user.toString() !== req.id.toString())
      return res.status(400).json({
        message: "Unauthorized to delete recipe.",
        success: false,
      });

    if (recipe.media_url) {
      const imgId = recipe.media_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Community.updateOne(
      { _id: recipe.community },
      { $pull: { recipes: id } }
    );

    await Recipe.findByIdAndDelete(id);
    return res.status(200).json({
      message: "recipe deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteRecipe: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
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

    if (recipes.length === 0)
      return res.status(200).json({
        message: "No Recipes",
        recipes: [],
        success: true,
      });

    return res.status(200).json({
      message: "Recipe fetched successfully",
      recipes,
      success: true,
    });
  } catch (error) {
    console.log("Error in getAllRecipes: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getLikedRecipes = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const likedRecipes = await Recipe.find({ _id: { $in: user.likedRecipes } })
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
      message: "Recipe fetched successfully",
      likedRecipes,
      success: true,
    });
  } catch (error) {
    console.log("Error in getLikedRecipes: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFollowingRecipes = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const feedRecipes = await Recipe.find({ _id: { $in: user.following } })
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
      message: "Recipes fetched successfully",
      feedRecipes,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFollowingRecipes: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getUserRecipes = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const recipes = await Recipe.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-passoword",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
      .populate("community");

    return res.status(200).json({
      message: "Recipes fetched successfully",
      recipes,
      success: true,
    });
  } catch (error) {
    console.log("Error in getUserRecipes: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getCommunityRecipes = async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    const recipes = await Recipe.find({ community: communityId })
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
      message: "Recipes fetched successfully",
      recipes,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCommunityRecipes: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
