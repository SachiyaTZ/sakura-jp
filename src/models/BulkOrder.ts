import mongoose, { Document } from 'mongoose';

export interface IBulkOrder extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: string;
}

const bulkOrderSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processed', 'shipped'], default: 'pending' },
});

export default mongoose.model<IBulkOrder>('BulkOrder', bulkOrderSchema);