import { User } from "../models/userM.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/fewatures.js";

export const getAllUser = async (req, res) => {};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // this is how we are sending error
    return res
      .status(404)
      .json({ success: false, message: "User doesn't exists" });
  }
  // if user is present
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // this is how we are sending error
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });
  }
  // if password matches
  sendCookie(user, res, `Welcome back,${user.name}`, 200);
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // here we are finding user
  let user = await User.findOne({ email });
  if (user) {
    // this is how we are sending error
    return res
      .status(404)
      .json({ success: false, message: "User already registered" });
  }
  // if user is not present we will create a new user
  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashPassword });

  // generating a token with a fucntion called from utils file
  sendCookie(user, res, "registered successfully", 201);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};
