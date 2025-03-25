import express from 'express';
import { addWarehouse, getWarehouseById, softDeleteWarehouse, updateWarehouse } from '../controllers/warehouseController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Admin-only route
// router.post('/', authenticate, authorize(['admin']), addWarehouse);
router.post('/', authenticate, authorize(['admin']), addWarehouse);
router.get('/:id', authenticate, authorize(['admin']), getWarehouseById);
router.put('/:id', authenticate, authorize(['admin']), updateWarehouse);
router.delete('/:id', authenticate, authorize(['admin']), softDeleteWarehouse);

export default router;