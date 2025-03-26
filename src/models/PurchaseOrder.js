"use strict";
// import mongoose, { Document } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IPurchaseOrder extends Document {
//   companyId: mongoose.Schema.Types.ObjectId;
//   products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
//   totalAmount: number;
//   status: string;
// }
// const purchaseOrderSchema = new mongoose.Schema({
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
// });
// export default mongoose.model<IPurchaseOrder>('PurchaseOrder', purchaseOrderSchema);
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseOrderSchema = new mongoose_1.default.Schema({
    companyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    deleted: { type: Boolean, default: false } // Soft delete flag
}, { timestamps: true });
exports.default = mongoose_1.default.model('PurchaseOrder', purchaseOrderSchema);
