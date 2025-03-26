"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dropShippingSchema = new mongoose_1.default.Schema({
    supplierId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
});
exports.default = mongoose_1.default.model('DropShipping', dropShippingSchema);
