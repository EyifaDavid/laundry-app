import express from 'express';
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/user/:userId',protect, getUserOrders);
router.patch('/:id/status',protect, updateOrderStatus);
router.get("/:id",protect, getOrderById);

export default router;
