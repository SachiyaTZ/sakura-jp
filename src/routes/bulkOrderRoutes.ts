import express from 'express';
import { createBulkOrder } from '../controllers/bulkOrderController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route
router.post('/bulk-orders', authenticate, authorize(['admin', 'manager']), createBulkOrder);

export default router;