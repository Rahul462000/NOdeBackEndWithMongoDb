import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile); ////3

router.post("/new", register); ///1
router.post("/login", login); ///2
router.get("/logout", logout); ////4

export default router;
