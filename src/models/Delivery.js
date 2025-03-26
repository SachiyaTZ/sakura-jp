"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deliverySchema = new mongoose_1.default.Schema({
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order', required: true },
    trackingNumber: { type: String, required: true },
    status: { type: String, enum: ['shipped', 'in transit', 'delivered'], default: 'shipped' },
});
exports.default = mongoose_1.default.model('Delivery', deliverySchema);
