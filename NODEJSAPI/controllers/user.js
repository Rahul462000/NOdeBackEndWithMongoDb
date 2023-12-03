import { User } from "../models/userM.js";

export const getAllUser = async (req, res) => {
  // this will return all the users
  const users = await User.find({});

  //   this is sended by params by postman
  //   this is how we send data to server and access it
  console.log(req.query);
  //   to access it
  const keyword = req.query.keyword;
  console.log(keyword);
  //

  res.json({
    success: true,
    users,
  });
};

export const newUsers = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.status(201).cookie("tempi", "lol").json({
    success: true,
    message: "User Register",
  });
};

export const special = (req, res) => {
  res.json({
    success: true,
    message: "just joking",
  });
};

export const userDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // when we give dynamic id
  //   console.log(req.params);
  res.json({
    success: true,
    user,
  });
};
