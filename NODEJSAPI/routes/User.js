import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
