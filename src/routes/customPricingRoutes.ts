import express from 'express';
import { setCustomPrice } from '../controllers/customPricingController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
router.post('/custom-pricing', authenticate, authorize(['admin']), setCustomPrice);

export default router;