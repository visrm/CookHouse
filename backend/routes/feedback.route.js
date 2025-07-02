import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteAllFeedbacks,
  deleteFeedback,
  getFeedbacks,
  createFeedback,
  getFeedbackById,
} from "../controllers/feedback.controller.js";

const router = Router();

router.post("/", isAuthenticated, createFeedback);
router.get("/", isAuthenticated, getFeedbacks);
router.get("/:id", isAuthenticated, getFeedbackById);
router.delete("/:id", isAuthenticated, deleteFeedback);
router.delete("/", isAuthenticated, deleteAllFeedbacks);

export default router;
