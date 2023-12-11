```javascript
import { Task } from "../models/task.js";

export const newTasks = async (req, res) => {
    const { title, description } = req.body;
console.log(title);
console.log(description);

await Task.create({ title, description, user: req.user });
res.status(201).json({
    success: true,
message: "task added successfully",
});
};
    - this is how we get data of a particular user

export const getMyTask = async (req, res) => {
// this will return id of the match userid
const userID = req.user.\_id;
const task = await Task.find({ user: userID });
res.status(201).json({
success: true,
task,
});
};
export const updateTask = async (req, res) => {
// access the id
const { id } = req.params;
// finding the task
const task = await Task.findById(id);
console.log(task);
if (!task)
return res.status(404).json({ success: false, message: "Task not found" });

// the check box
task.isCompleted = !task.isCompleted;
await task.save();

res.status(201).json({
success: true,
message: "Task updated successfully",
});
};

export const deleteTask = async (req, res) => {
const { id } = req.params;
// finding the task
const task = await Task.findById(id);
if (!task)
return res.status(404).json({ success: false, message: "Task not found" });
// the check box
await task.deleteOne();

res.status(201).json({
success: true,
message: "Task deleted successfully",
});
};



// import express from "express";
import {
  deleteTask,
  getMyTask,
  newTasks,
  updateTask,
} from "../controllers/TodoTasks.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// here only those user can enter a new task who are loggedIN
router.post("/new", isAuthenticated, newTasks);

// to get all tasks of a particular user
router.get("/my", isAuthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;


```
