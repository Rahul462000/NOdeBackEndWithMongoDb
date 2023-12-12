import { User } from "../models/userM.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/fewatures.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User not registerd ", 400));

    // if user is present
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password ", 400));
    // if password matches
    sendCookie(user, res, `Welcome back,${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // here we are finding user
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already registered", 400));

    // if user is not present we will create a new user
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });

    // generating a token with a fucntion called from utils file
    sendCookie(user, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
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
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
