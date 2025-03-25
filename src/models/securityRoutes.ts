import express from 'express';
import {
  enable2FA,
  disable2FA,
  addWhitelistedIP,
  removeWhitelistedIP,
} from '../controllers/securityController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// 2FA Routes
router.post('/users/:userId/enable-2fa', authorize(['buyer', 'admin', 'manager']), enable2FA);
router.post('/users/:userId/disable-2fa', authorize(['buyer', 'admin', 'manager']), disable2FA);

// IP Whitelisting Routes
router.post('/users/whitelist-ip', authorize(['admin', 'manager']), addWhitelistedIP);
router.delete('/users/whitelist-ip', authorize(['admin', 'manager']), removeWhitelistedIP);

export default router;