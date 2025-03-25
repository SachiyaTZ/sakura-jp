import express from 'express';
import { applyDiscount } from '../controllers/discountController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route
router.post('/discounts/apply', authenticate, applyDiscount);

export default router;