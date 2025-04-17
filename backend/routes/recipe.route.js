import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  commentOnRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getFollowingRecipes,
  getLikedRecipes,
  getUserRecipes,
  likeUnlikeRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();
router.post("/create", isAuthenticated, createRecipe);
router.post("/like/:id", isAuthenticated, likeUnlikeRecipe);
router.post("/comment/:id", isAuthenticated, commentOnRecipe);
router.get("/all", isAuthenticated, getAllRecipes);
router.get("/likes/:id", isAuthenticated, getLikedRecipes);
router.get("/user/:username", isAuthenticated, getUserRecipes);
router.get("/following", isAuthenticated, getFollowingRecipes);
router.delete("/delete/:id", isAuthenticated, deleteRecipe);

export default router;
