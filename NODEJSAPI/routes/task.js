import express from "express";
import {
  deleteTask,
  getMyTask,
  newTasks,
  updateTask,
} from "../controllers/TodoTasks.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// here only those user can enter a new task who are loggedIN
router.post("/new", isAuthenticated, newTasks); ////1.

// to get all tasks of a particular user
router.get("/my", isAuthenticated, getMyTask); ////2.

router /////3.
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
