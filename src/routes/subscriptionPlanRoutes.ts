import express from 'express';
import {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  softDeleteSubscriptionPlan
} from '../controllers/subscriptionPlanController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes (if needed)
router.get('/', getAllSubscriptionPlans);
router.get('/:id', getSubscriptionPlanById);

// Protected routes
router.post('/', authenticate, authorize(['admin']), createSubscriptionPlan);
router.put('/:id', authenticate, authorize(['admin']), updateSubscriptionPlan);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteSubscriptionPlan);

export default router;