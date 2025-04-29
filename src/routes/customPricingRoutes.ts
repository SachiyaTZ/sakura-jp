import express from 'express';
import { setCustomPrice } from '../controllers/customPricingController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/custom-pricing', authenticate, authorize(['admin, manager']), setCustomPrice);

export default router;