import express from "express";
import {
  getAllUser,
  newUsers,
  special,
  userDetails,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUser);

router.post("/new", newUsers);

router.get("/userid/special", special);

router.get("/userid/:id", userDetails);

export default router;
