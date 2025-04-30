// import express from 'express';
// import { createSubscription } from '../controllers/subscriptionController';
// import { authenticate, authorize } from '../middleware/authMiddleware';

// const router = express.Router();

// // Protected route
// router.post('/', authenticate, authorize(['admin', 'manager']), createSubscription);

// export default router;

import express from 'express';
import { 
  createSubscription,
  getAllSubscriptions,
  getSubscriptionsByType,
  updateSubscription,
  softDeleteSubscription
} from '../controllers/subscriptionController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/', authenticate, authorize(['admin', 'manager']), createSubscription);
router.get('/', authenticate, authorize(['admin', 'manager']), getAllSubscriptions);
router.get('/type/:type', authenticate, authorize(['admin', 'manager']), getSubscriptionsByType);
router.put('/:id', authenticate, authorize(['admin', 'manager']), updateSubscription);
router.delete('/:id', authenticate, authorize(['admin', 'manager']), softDeleteSubscription);

export default router;