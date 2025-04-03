import { Router } from "express";
import {
  getAllPosts,
  commentOnPost,
  createPost,
  deletePost,
  likeUnlikePost,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();
router.post("/create", isAuthenticated, createPost);
router.post("/like/:id", isAuthenticated, likeUnlikePost);
router.post("/comment/:id", isAuthenticated, commentOnPost);
router.get("/all", isAuthenticated, getAllPosts);
router.get("/likes/:id", isAuthenticated, getLikedPosts);
router.get("/user/:username", isAuthenticated, getUserPosts);
router.get("/following", isAuthenticated, getFollowingPosts);
router.delete("/delete/:id", isAuthenticated, deletePost);

export default router;