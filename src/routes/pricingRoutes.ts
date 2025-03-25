import express from 'express';
import { addPricingTier, getPricingTiers } from '../controllers/pricingController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, authorize(['admin']), addPricingTier);
router.get('/', authenticate, authorize(['admin']), getPricingTiers);

export default router;