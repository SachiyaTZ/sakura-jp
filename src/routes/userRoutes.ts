import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, getUserProfile, getAllUsers, verifyUser, forgotPassword, resetPassword, bulkImportUsers, bulkExportUsers } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authenticate, getUserProfile);

// Verification route
router.get('/verify', verifyUser);

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.post('/reset-password', resetPassword);

// Admin-only route
router.get('/admin/users', authenticate, authorize(['admin']), getAllUsers);


// Admin-only routes
router.post('/bulk-import', authenticate, authorize(['admin']), upload.single('file'), bulkImportUsers);
router.get('/bulk-export', authenticate, authorize(['admin']), bulkExportUsers);

export default router;