import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  updateCommunity,
  createCommunity,
  deleteCommunityById,
  getCommunities,
  getCommunityById,
  joinUnjoinCommunityById,
  getOwnerCommunities,
  getUserCommunities,
} from "../controllers/community.controller.js";

const router = Router();

router.post("/create", isAuthenticated, createCommunity);
router.delete("/delete/:communityId", isAuthenticated, deleteCommunityById);
router.get("/all", isAuthenticated, getCommunities);
router.get("/get/:communityId", isAuthenticated, getCommunityById);
router.get("/own", isAuthenticated, getOwnerCommunities);
router.get("/user/communities", isAuthenticated, getUserCommunities);
router.get("/join/:communityId", isAuthenticated, joinUnjoinCommunityById);
router.patch("/update/:communityId", isAuthenticated, updateCommunity);

export default router;
