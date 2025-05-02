import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getCommunityEvents,
  getUserCommunitiesEvents,
} from "../controllers/event.controller.js";

const router = Router();
router.post("/:communityId/create", isAuthenticated, createEvent);
router.get("/community/:communityId", isAuthenticated, getCommunityEvents);
router.get("/communities/user", isAuthenticated, getUserCommunitiesEvents);
router.get("/all", isAuthenticated, getAllEvents);
router.delete("/delete/:id", isAuthenticated, deleteEvent);

export default router;
