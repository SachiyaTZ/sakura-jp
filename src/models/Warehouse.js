"use strict";
// import mongoose, { Document } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IWarehouse extends Document {
//   name: string;
//   location: string;
//   products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
// }
// const warehouseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
// });
// export default mongoose.model<IWarehouse>('Warehouse', warehouseSchema);
const mongoose_1 = __importDefault(require("mongoose"));
const warehouseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    companyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    deleted: { type: Boolean, default: false }, // Soft delete flag
});
exports.default = mongoose_1.default.model('Warehouse', warehouseSchema);
