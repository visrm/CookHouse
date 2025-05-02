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
  createCommunityPost,
  getCommunityPosts,
  getUserCommunitiesPosts,
  deleteComment,
} from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();
router.post("/create", isAuthenticated, createPost);
router.post("/:communityId/create", isAuthenticated, createCommunityPost);
router.get("/like/:id", isAuthenticated, likeUnlikePost);
router.post("/comment/:id", isAuthenticated, commentOnPost);
router.get("/all", isAuthenticated, getAllPosts);
router.get("/likes/:id", isAuthenticated, getLikedPosts);
router.get("/user/:username", isAuthenticated, getUserPosts);
router.get("/community/:communityId", isAuthenticated, getCommunityPosts);
router.get("/communities/user", isAuthenticated, getUserCommunitiesPosts);
router.get("/following", isAuthenticated, getFollowingPosts);
router.delete("/:postId/comment/:id", isAuthenticated, deleteComment);
router.delete("/:id", isAuthenticated, deletePost);

export default router;
