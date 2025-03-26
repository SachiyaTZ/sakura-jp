"use strict";
// import { Request, Response } from 'express';
// import Invoice from '../models/Invoice';
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
exports.softDeleteInvoice = exports.updateInvoice = exports.getInvoiceById = exports.createInvoice = void 0;
const Invoice_1 = __importDefault(require("../models/Invoice"));
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, orderId, amount, currency } = req.body;
    try {
        // Validate required fields
        if (!companyId || !orderId || !amount || !currency) {
            res.status(400).json({ error: 'Missing required fields: companyId, orderId, amount, or currency' });
            return;
        }
        // Validate currency (optional, since the schema already enforces enum values)
        const validCurrencies = ['USD', 'EUR', 'INR', 'JPY'];
        if (!validCurrencies.includes(currency)) {
            res.status(400).json({ error: `Invalid currency. Supported currencies are: ${validCurrencies.join(', ')}` });
            return;
        }
        // Create and save the invoice
        const invoice = new Invoice_1.default({ companyId, orderId, amount, currency });
        yield invoice.save();
        // Send success response
        res.status(201).json({ message: 'Invoice created successfully', invoice });
    }
    catch (error) {
        console.error('Error creating invoice:', error);
        // Type-cast the error to CustomError
        const err = error;
        // Handle specific errors
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
            res.status(400).json({ error: err.message });
            return;
        }
        if (err.code === 11000) {
            // Handle duplicate key errors
            res.status(400).json({ error: 'Duplicate invoice detected' });
            return;
        }
        // Handle all other errors
        res.status(500).json({ error: 'Error creating invoice' });
    }
});
exports.createInvoice = createInvoice;
const getInvoiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const invoice = yield Invoice_1.default.findOne({ _id: id, deleted: false }); // Exclude soft-deleted invoices
        if (!invoice) {
            res.status(404).json({ error: 'Invoice not found' });
            return;
        }
        res.status(200).json(invoice);
    }
    catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Error fetching invoice' });
    }
});
exports.getInvoiceById = getInvoiceById;
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { companyId, orderId, amount, currency, status } = req.body;
    try {
        // Validate required fields
        if (!companyId || !orderId || !amount || !currency || !status) {
            res.status(400).json({ error: 'Missing required fields: companyId, orderId, amount, currency, or status' });
            return;
        }
        // Validate currency
        const validCurrencies = ['USD', 'EUR', 'INR', 'LKR', 'JPY'];
        if (!validCurrencies.includes(currency)) {
            res.status(400).json({ error: `Invalid currency. Supported currencies are: ${validCurrencies.join(', ')}` });
            return;
        }
        // Validate status
        const validStatuses = ['unpaid', 'paid'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: `Invalid status. Supported statuses are: ${validStatuses.join(', ')}` });
            return;
        }
        // Update the invoice
        const updatedInvoice = yield Invoice_1.default.findByIdAndUpdate(id, { companyId, orderId, amount, currency, status }, { new: true } // Return the updated document
        );
        if (!updatedInvoice) {
            res.status(404).json({ error: 'Invoice not found' });
            return;
        }
        res.status(200).json({ message: 'Invoice updated successfully', invoice: updatedInvoice });
    }
    catch (error) {
        console.error('Error updating invoice:', error);
        res.status(500).json({ error: 'Error updating invoice' });
    }
});
exports.updateInvoice = updateInvoice;
const softDeleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Soft delete the invoice by setting `deleted` to true
        const deletedInvoice = yield Invoice_1.default.findByIdAndUpdate(id, { deleted: true }, { new: true } // Return the updated document
        );
        if (!deletedInvoice) {
            res.status(404).json({ error: 'Invoice not found' });
            return;
        }
        res.status(200).json({ message: 'Invoice soft deleted successfully', invoice: deletedInvoice });
    }
    catch (error) {
        console.error('Error soft deleting invoice:', error);
        res.status(500).json({ error: 'Error soft deleting invoice' });
    }
});
exports.softDeleteInvoice = softDeleteInvoice;
