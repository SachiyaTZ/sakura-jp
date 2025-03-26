"use strict";
// import express from 'express';
// import { createPurchaseOrder } from '../controllers/purchaseOrderController';
// import { authenticate, authorize } from '../middleware/authMiddleware';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// // Protected route
// router.post('/purchase-orders', authenticate, authorize(['admin', 'manager']), createPurchaseOrder);
// export default router;
const express_1 = __importDefault(require("express"));
const purchaseOrderController_1 = require("../controllers/purchaseOrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), purchaseOrderController_1.createPurchaseOrder);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), purchaseOrderController_1.getAllPurchaseOrders);
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), purchaseOrderController_1.getPurchaseOrderById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin', 'manager']), purchaseOrderController_1.updatePurchaseOrder);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), purchaseOrderController_1.softDeletePurchaseOrder);
exports.default = router;
