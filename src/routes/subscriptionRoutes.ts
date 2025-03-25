import express from 'express';
import { createSubscription } from '../controllers/subscriptionController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route
router.post('/subscriptions', authenticate, authorize(['admin', 'manager']), createSubscription);

export default router;