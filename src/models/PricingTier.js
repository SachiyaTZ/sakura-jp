"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pricingTierSchema = new mongoose_1.default.Schema({
    customerType: { type: String, required: true },
    minVolume: { type: Number, required: true },
    maxVolume: { type: Number },
    price: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('PricingTier', pricingTierSchema);
