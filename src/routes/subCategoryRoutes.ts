import express from 'express';
import {
  addSubCategory,
  getSubCategoryById,
  updateSubCategory,
  softDeleteSubCategory,
  getAllSubCategories,
} from '../controllers/subCategoryController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only routes
router.post('/', authenticate, authorize(['admin']), addSubCategory);
router.get('/', authenticate, authorize(['admin']), getAllSubCategories);
router.get('/:id', authenticate, authorize(['admin']), getSubCategoryById);
router.put('/:id', authenticate, authorize(['admin']), updateSubCategory);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteSubCategory);

export default router;