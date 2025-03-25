import express from 'express';
import { reserveStock } from '../controllers/reservedStockController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
router.post('/reserved-stock', authenticate, authorize(['admin']), reserveStock);

export default router;