import express from "express";
import { placeOrder, guestOrder, getOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.post("/guest", guestOrder);
router.get("/:id", getOrder);

export default router;
