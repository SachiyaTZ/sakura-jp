import express from 'express';
import {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../controllers/notificationController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);
router.post('/notifications', authorize(['admin', 'manager']), createNotification);
router.get('/notifications/:userId', authorize(['buyer', 'admin', 'manager']), getNotifications);
router.put('/notifications/:id', authorize(['admin', 'manager']), updateNotification);
router.delete('/notifications/:id', authorize(['admin', 'manager']), deleteNotification);

export default router;