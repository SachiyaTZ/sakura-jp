import express from 'express';
import { addAddress, getAddresses, updateAddress, deleteAddress } from '../controllers/addressController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/addresses', authenticate, addAddress);
router.get('/users/:userId/addresses', authenticate, getAddresses);
router.put('/addresses/:id', authenticate, updateAddress);
router.delete('/addresses/:id', authenticate, deleteAddress);

export default router;