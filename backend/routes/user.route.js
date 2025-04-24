import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser,
  getFollowingUsersById,
  getFollowerUsersById,
  excludingLoggedUser,
} from "../controllers/user.controller.js";

const router = Router();
router.get("/profile/:username", isAuthenticated, getProfile);
router.post("/follow/:id", isAuthenticated, followUnfollowUser);
router.get("/suggested", isAuthenticated, getSuggestedUsers);
router.get("/followings/:userId", isAuthenticated, getFollowingUsersById);
router.get("/followers/:userId", isAuthenticated, getFollowerUsersById);
router.get("/explore", isAuthenticated, excludingLoggedUser);
router.patch("/update", isAuthenticated, updateUser);

export default router;
