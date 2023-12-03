import express from "express";
import userRouter from "./routes/User.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./data/config.env",
});

// to access the body data middleware
app.use(express.json());
app.use("/users", userRouter);

// 1.
app.get("/", (req, res) => {
  res.send("<h1>Hello everyone</h1>");
});
