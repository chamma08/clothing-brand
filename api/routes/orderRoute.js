import express from "express";
import { placeOrder, guestOrder, getOrder } from "../controllers/orderController.js";
import authenticateToken  from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, placeOrder);
router.post("/guest", guestOrder);
router.get("/:id", authenticateToken, getOrder);

export default router;
