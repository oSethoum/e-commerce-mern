import mongoose from "mongoose";
import express from "express";
import { setupRoutes } from "./routes";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {
  authSource: "admin",
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});

const app = express();
const port = process.env.PORT || 4000;

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
