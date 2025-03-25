// import mongoose, { Document } from 'mongoose';

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

import mongoose, { Document } from 'mongoose';

export interface IPurchaseOrder extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: string;
  deleted: boolean; // Soft delete flag
}

const purchaseOrderSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
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

export default mongoose.model<IPurchaseOrder>('PurchaseOrder', purchaseOrderSchema);