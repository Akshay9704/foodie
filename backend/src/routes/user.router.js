import { Router } from "express";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/current-user").get(getCurrentUser)

router.route("/logout").post(logoutUser)

export default router;