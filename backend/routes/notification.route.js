import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", isAuthenticated, getNotifications);
router.delete("/:id", isAuthenticated, deleteNotification);
router.delete("/", isAuthenticated, deleteAllNotifications);

export default router;
