// import express from 'express';
// import { createPurchaseOrder } from '../controllers/purchaseOrderController';
// import { authenticate, authorize } from '../middleware/authMiddleware';

// const router = express.Router();

// // Protected route
// router.post('/purchase-orders', authenticate, authorize(['admin', 'manager']), createPurchaseOrder);

// export default router;

import express from 'express';
import { 
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  softDeletePurchaseOrder
} from '../controllers/purchaseOrderController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/', authenticate, authorize(['admin', 'manager']), createPurchaseOrder);
router.get('/', authenticate, authorize(['admin', 'manager']), getAllPurchaseOrders);
router.get('/:id', authenticate, authorize(['admin', 'manager']), getPurchaseOrderById);
router.put('/:id', authenticate, authorize(['admin', 'manager']), updatePurchaseOrder);
router.delete('/:id', authenticate, authorize(['admin']), softDeletePurchaseOrder);

export default router;