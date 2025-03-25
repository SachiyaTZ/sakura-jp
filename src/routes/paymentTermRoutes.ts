import express from 'express';
import { setPaymentTerm } from '../controllers/paymentTermController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
router.post('/payment-terms', authenticate, authorize(['admin']), setPaymentTerm);

export default router;