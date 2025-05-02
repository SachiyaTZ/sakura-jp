import express from 'express';
import { getCustomPriceById, getCustomPricing, setCustomPrice, softDeleteCustomPrice, updateCustomPrice } from '../controllers/customPricingController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// router.post('/', authenticate, authorize(['admin, manager']), setCustomPrice);
router.post('/', authenticate, authorize(['admin', 'manager']), setCustomPrice);
router.get('/', authenticate, authorize(['admin', 'manager']), getCustomPricing);
router.get('/:id', authenticate, authorize(['admin', 'manager']), getCustomPriceById);
router.put('/:id', authenticate, authorize(['admin', 'manager']), updateCustomPrice);
router.delete('/:id', authenticate, authorize(['admin', 'manager']), softDeleteCustomPrice);

export default router;