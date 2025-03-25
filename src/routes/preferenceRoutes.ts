import express from 'express';
import { updatePreferences, getPreferences } from '../controllers/preferenceController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.put('/preferences', authenticate, updatePreferences);
router.get('/users/:userId/preferences', authenticate, getPreferences);

export default router;