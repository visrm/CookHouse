import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  reviewOnRecipe,
  createCommunityRecipe,
  createRecipe,
  deleteReview,
  deleteRecipe,
  getAllRecipes,
  getCommunityRecipes,
  getLikedRecipes,
  getUserCommunitiesRecipes,
  getUserRecipes,
  likeUnlikeRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();
router.post("/create", isAuthenticated, createRecipe);
router.post("/:communityId/create", isAuthenticated, createCommunityRecipe);
router.post("/like/:id", isAuthenticated, likeUnlikeRecipe);
router.post("/review/:id", isAuthenticated, reviewOnRecipe);
router.get("/all", isAuthenticated, getAllRecipes);
router.get("/likes/:id", isAuthenticated, getLikedRecipes);
router.get("/user/:username", isAuthenticated, getUserRecipes);
router.get("/community/:communityId", isAuthenticated, getCommunityRecipes);
router.get("/communities/user", isAuthenticated, getUserCommunitiesRecipes);
router.delete("/review/:recipeId/:id", isAuthenticated, deleteReview);
router.delete("/recipe/:id", isAuthenticated, deleteRecipe);

export default router;
