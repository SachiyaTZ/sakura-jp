"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const freightShippingSchema = new mongoose_1.default.Schema({
    carrier: { type: String, required: true },
    service: { type: String, required: true },
    rate: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
});
exports.default = mongoose_1.default.model('FreightShipping', freightShippingSchema);
