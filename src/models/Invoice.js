"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const invoiceSchema = new mongoose_1.default.Schema({
    companyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ['USD', 'EUR', 'INR', 'LKR', 'JPY'], default: 'USD' }, // Add currency field with enum validation
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    deleted: { type: Boolean, default: false }, // Soft delete flag
});
exports.default = mongoose_1.default.model('Invoice', invoiceSchema);
