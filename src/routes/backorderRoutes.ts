import express from 'express';
import { createBackorder } from '../controllers/backorderController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
router.post('/backorders', authenticate, authorize(['admin']), createBackorder);

export default router;