import express from 'express';
import { createCustomShippingAgreement, getFreightShippingOptions, getShippingRates, trackDelivery } from '../controllers/shippingController';
import { createDropShippingOrder } from '../controllers/subscriptionController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Public route
router.get('/shipping-rates', getShippingRates);
router.get('/delivery/:trackingNumber', trackDelivery);
router.get('/freight-shipping-options', getFreightShippingOptions);
router.get('/delivery/:trackingNumber', trackDelivery);

router.post('/drop-shipping', authenticate, authorize(['admin']), createDropShippingOrder);
router.post('/custom-shipping-agreements', authenticate, authorize(['admin']), createCustomShippingAgreement);

export default router;