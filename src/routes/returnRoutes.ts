import express from 'express';
import { requestReturn } from '../controllers/returnController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route
router.post('/returns', authenticate, requestReturn);

export default router;