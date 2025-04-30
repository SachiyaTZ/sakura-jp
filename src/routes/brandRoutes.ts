import express from 'express';
import {
  addBrand,
  getBrandById,
  updateBrand,
  softDeleteBrand,
  getAllBrands,
} from '../controllers/brandController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, authorize(['admin']), addBrand);
router.get('/', authenticate, authorize(['admin']), getAllBrands);
router.get('/:id', authenticate, authorize(['admin', 'manager' , 'buyer']), getBrandById);
router.put('/:id', authenticate, authorize(['admin']), updateBrand);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteBrand);

export default router;