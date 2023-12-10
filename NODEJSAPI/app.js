import express from "express";
import userRouter from "./routes/User.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/config.env",
});

// to access the body data middleware
app.use(express.json());
app.use(cookieParser());
// using routes
app.use("/api/v1/users", userRouter);

// 1.
app.get("/", (req, res) => {
  res.send("<h1>Hello everyone</h1>");
});
