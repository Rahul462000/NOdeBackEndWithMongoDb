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

export const getMyTask = async (req, res) => {
  // this will return id of the match userid
  const userID = req.user._id;
  const task = await Task.find({ user: userID });
  res.status(201).json({
    success: true,
    task,
  });
};
export const updateTask = async (req, res) => {
  // access the id
  const { id } = req.params;

  res.status(201).json({
    success: true,
  });
};

export const deleteTask = async (req, res) => {
  // this will return id of the match userid

  res.status(201).json({
    success: true,
  });
};
