"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerBehaviorSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    totalOrders: { type: Number, required: true },
    totalSpent: { type: Number, required: true },
    lastPurchaseDate: { type: Date, required: true },
});
exports.default = mongoose_1.default.model('CustomerBehavior', customerBehaviorSchema);
