import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import dbConnect from "./utils/dbConnect.js";

import authRoute from "./routes/auth.route.js";

dotenv.config({});

// Initialise app
const app = new express();
const PORT = process.env.PORT || 8000;

// middelwares
app.use(express.json({ limit: "5mb" })); // to parse req.body - limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/v0/auth", authRoute);

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await dbConnect();
});
