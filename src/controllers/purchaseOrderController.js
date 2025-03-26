"use strict";
// import { Request, Response } from 'express';
// import PurchaseOrder from '../models/PurchaseOrder';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePurchaseOrder = exports.updatePurchaseOrder = exports.getPurchaseOrderById = exports.getAllPurchaseOrders = exports.createPurchaseOrder = void 0;
const PurchaseOrder_1 = __importDefault(require("../models/PurchaseOrder"));
// Create Purchase Order
const createPurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, products, totalAmount } = req.body;
    try {
        // Validate required fields
        if (!companyId || !products || !totalAmount) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const purchaseOrder = new PurchaseOrder_1.default({
            companyId,
            products,
            totalAmount
        });
        yield purchaseOrder.save();
        res.status(201).json({
            message: 'Purchase order created successfully',
            purchaseOrder
        });
    }
    catch (error) {
        console.error('Error creating purchase order:', error);
        res.status(500).json({ error: 'Error creating purchase order' });
    }
});
exports.createPurchaseOrder = createPurchaseOrder;
// Get All Purchase Orders (excluding soft-deleted)
const getAllPurchaseOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseOrders = yield PurchaseOrder_1.default.find({ deleted: false })
            .populate('companyId')
            .populate('products.productId');
        res.status(200).json(purchaseOrders);
    }
    catch (error) {
        console.error('Error fetching purchase orders:', error);
        res.status(500).json({ error: 'Error fetching purchase orders' });
    }
});
exports.getAllPurchaseOrders = getAllPurchaseOrders;
// Get Purchase Order by ID
const getPurchaseOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const purchaseOrder = yield PurchaseOrder_1.default.findOne({
            _id: id,
            deleted: false
        })
            .populate('companyId')
            .populate('products.productId');
        if (!purchaseOrder) {
            res.status(404).json({ error: 'Purchase order not found' });
            return;
        }
        res.status(200).json(purchaseOrder);
    }
    catch (error) {
        console.error('Error fetching purchase order:', error);
        res.status(500).json({ error: 'Error fetching purchase order' });
    }
});
exports.getPurchaseOrderById = getPurchaseOrderById;
// Update Purchase Order
const updatePurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { companyId, products, totalAmount, status } = req.body;
    try {
        // Validate required fields
        if (!companyId || !products || !totalAmount) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const updatedPurchaseOrder = yield PurchaseOrder_1.default.findByIdAndUpdate(id, {
            companyId,
            products,
            totalAmount,
            status: status || 'pending'
        }, { new: true })
            .populate('companyId')
            .populate('products.productId');
        if (!updatedPurchaseOrder) {
            res.status(404).json({ error: 'Purchase order not found' });
            return;
        }
        res.status(200).json({
            message: 'Purchase order updated successfully',
            purchaseOrder: updatedPurchaseOrder
        });
    }
    catch (error) {
        console.error('Error updating purchase order:', error);
        res.status(500).json({ error: 'Error updating purchase order' });
    }
});
exports.updatePurchaseOrder = updatePurchaseOrder;
// Soft Delete Purchase Order (set deleted to true)
const softDeletePurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPurchaseOrder = yield PurchaseOrder_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!deletedPurchaseOrder) {
            res.status(404).json({ error: 'Purchase order not found' });
            return;
        }
        res.status(200).json({
            message: 'Purchase order soft deleted successfully',
            purchaseOrder: deletedPurchaseOrder
        });
    }
    catch (error) {
        console.error('Error soft deleting purchase order:', error);
        res.status(500).json({ error: 'Error soft deleting purchase order' });
    }
});
exports.softDeletePurchaseOrder = softDeletePurchaseOrder;
