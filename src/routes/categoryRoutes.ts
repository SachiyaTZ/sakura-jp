import express from 'express';
import {
  addCategory,
  getCategoryById,
  updateCategory,
  softDeleteCategory,
  getAllCategories,
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, authorize(['admin']), addCategory);
router.get('/', authenticate, authorize(['admin']), getAllCategories);
router.get('/:id', authenticate, authorize(['admin']), getCategoryById);
router.put('/:id', authenticate, authorize(['admin']), updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteCategory);

export default router;