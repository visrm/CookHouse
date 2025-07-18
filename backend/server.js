import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "./utils/dbConnect.js";
import errorHandler from "./middlewares/errorHandler.js";

// api-routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import recipeRoute from "./routes/recipe.route.js";
import notificationRoute from "./routes/notification.route.js";
import communityRoute from "./routes/community.route.js";
import chatRoute from "./routes/chat.route.js";
import eventRoute from "./routes/event.route.js";
import feedbackRoute from "./routes/feedback.route.js";

dotenv.config({});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialise app
const app = new express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// middlewares
app.use(express.json({ limit: "5mb" })); // to parse req.body - limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // to parse form data(urlencoded)
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://cookhouse.onrender.com",
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// route apis'
app.use("/api/v0/auth", authRoute);
app.use("/api/v0/users", userRoute);
app.use("/api/v0/posts", postRoute);
app.use("/api/v0/recipes", recipeRoute);
app.use("/api/v0/notifications", notificationRoute);
app.use("/api/v0/communities", communityRoute);
app.use("/api/v0/chats", chatRoute);
app.use("/api/v0/events", eventRoute);
app.use("/api/v0/feedbacks", feedbackRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/CookHouse-app/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "CookHouse-app", "dist", "index.html")
    );
  });
}

// Error handling middleware MUST be the last middleware
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await dbConnect();
});
