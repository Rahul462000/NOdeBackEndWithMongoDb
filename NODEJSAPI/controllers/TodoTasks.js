import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTasks = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(title);
    console.log(description);

    await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  // this will return id of the match userid
  try {
    const userID = req.user._id;
    const task = await Task.find({ user: userID });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  // access the id
  try {
    const { id } = req.params;
    // finding the task
    const task = await Task.findById(id);
    console.log(task);
    if (!task)
      return next(new ErrorHandler("Invalid Id or task not found", 404));

    // the check box
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    // finding the task
    const task = await Task.findById(id);
    if (!task)
      return next(new ErrorHandler("Invalid Id or task not found", 404));
    // the check box
    await task.deleteOne();

    res.status(201).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
