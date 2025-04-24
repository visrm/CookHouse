import { Router } from "express";
import {
  deleteMessageById,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/conversation/:id", isAuthenticated, getMessages);
router.post("/message/send/:receiverId", isAuthenticated, sendMessage);
router.delete("/message/delete/:messageId", isAuthenticated, deleteMessageById);

export default router;
