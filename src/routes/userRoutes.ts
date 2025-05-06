import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, getUserProfile, getAllUsers, verifyUser, forgotPassword, resetPassword, bulkImportUsers, bulkExportUsers, registerManager } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
router.get('/verify', verifyUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/register/manager', authenticate, authorize(['admin']), registerManager);

router.get('/admin/users', authenticate, authorize(['admin']), getAllUsers);

router.post('/bulk-import', authenticate, authorize(['admin', 'manager']), upload.single('file'), bulkImportUsers);
router.post('/bulk-import', authenticate, authorize(['admin', 'manager']), bulkExportUsers);

export default router;