import express from 'express';
import { getOrderHistory, createOrder, trackOrder } from '../controllers/orderController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.get('/users/:userId/orders', authenticate, getOrderHistory);
router.post('/orders', authenticate, createOrder);
router.get('/orders/:orderId', authenticate, trackOrder);

export default router;