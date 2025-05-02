import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  commentOnRecipe,
  createCommunityRecipe,
  createRecipe,
  deleteComment,
  deleteRecipe,
  getAllRecipes,
  getCommunityRecipes,
  getFollowingRecipes,
  getLikedRecipes,
  getUserCommunitiesRecipes,
  getUserRecipes,
  likeUnlikeRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();
router.post("/create", isAuthenticated, createRecipe);
router.post("/:communityId/create", isAuthenticated, createCommunityRecipe);
router.post("/like/:id", isAuthenticated, likeUnlikeRecipe);
router.post("/comment/:id", isAuthenticated, commentOnRecipe);
router.get("/all", isAuthenticated, getAllRecipes);
router.get("/likes/:id", isAuthenticated, getLikedRecipes);
router.get("/user/:username", isAuthenticated, getUserRecipes);
router.get("/community/:communityId", isAuthenticated, getCommunityRecipes);
router.get("/communities/user", isAuthenticated, getUserCommunitiesRecipes);
router.get("/following", isAuthenticated, getFollowingRecipes);
router.delete("/:recipeId/comment/:id", isAuthenticated, deleteComment);
router.delete("/:id", isAuthenticated, deleteRecipe);

export default router;
