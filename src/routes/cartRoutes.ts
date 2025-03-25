import express from 'express';
import { addToCart, getCart } from '../controllers/cartController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/cart', authenticate, addToCart);
router.get('/cart/:userId', authenticate, getCart);

export default router;