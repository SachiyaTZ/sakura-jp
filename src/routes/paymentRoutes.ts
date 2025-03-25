import express from 'express';
import { addPaymentMethod, getPaymentMethods, deletePaymentMethod, processPayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/payment-methods', authenticate, addPaymentMethod);
router.get('/users/:userId/payment-methods', authenticate, getPaymentMethods);
router.delete('/payment-methods/:id', authenticate, deletePaymentMethod);
router.post('/payments', authenticate, processPayment);

export default router;