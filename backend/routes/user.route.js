import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser
} from "../controllers/user.controller.js";

const router = Router();
router.get("/profile/:username", isAuthenticated, getProfile);
router.post("/follow/:id", isAuthenticated, followUnfollowUser);
router.get("/suggested", isAuthenticated, getSuggestedUsers);
router.patch("/update", isAuthenticated, updateUser);

export default router;
