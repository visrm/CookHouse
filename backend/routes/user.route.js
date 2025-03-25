import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getProfile, followUnfollowUser } from "../controllers/user.controller.js";

const router = Router();
router.get("/profile/:username", isAuthenticated, getProfile);
router.post("/follow/:id", isAuthenticated, followUnfollowUser);

export default router;