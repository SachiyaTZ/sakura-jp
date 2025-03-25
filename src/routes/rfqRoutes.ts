import express from 'express';
import { createRFQ } from '../controllers/rfqController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route
router.post('/rfqs', authenticate, authorize(['admin', 'manager']), createRFQ);

export default router;