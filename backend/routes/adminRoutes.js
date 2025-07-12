import express from "express";
import { getAllOrders, getAllUsers } from "../controllers/adminController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/orders", protect, isAdmin, getAllOrders);
router.get("/users", protect, isAdmin, getAllUsers);

export default router;
