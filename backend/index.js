import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
dotenv.config({});

// Initialise app
const app = new express();

// middelwares
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`Server running on PORT:${PORT}`);
  dbConnect();
});
