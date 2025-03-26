"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productBundleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    price: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('ProductBundle', productBundleSchema);
