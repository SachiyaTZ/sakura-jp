"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subscriptionSchema = new mongoose_1.default.Schema({
    companyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    frequency: { type: String, enum: ['weekly', 'monthly', 'quarterly'], required: true },
    status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
});
exports.default = mongoose_1.default.model('Subscription', subscriptionSchema);
