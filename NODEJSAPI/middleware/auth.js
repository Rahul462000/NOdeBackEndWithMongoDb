import { User } from "../models/userM.js";
import Jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  // if token is not present
  if (!token)
    return res.status(404).json({ success: false, message: "Login first" });

  const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  next();
};
