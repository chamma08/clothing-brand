import express from "express";
import { signin, signup } from "../controllers/authController.js";
import { validateSignup, validateSignin } from "../middleware/validation.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

export default router;