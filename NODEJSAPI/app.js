import express from "express";
import userRouter from "./routes/User.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// to access the body data middleware
app.use(express.json());
app.use(cookieParser());
// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 1.
app.get("/", (req, res) => {
  res.send("<h1>Hello everyone</h1>");
});

// error handling middleware
app.use(errorMiddleware);
