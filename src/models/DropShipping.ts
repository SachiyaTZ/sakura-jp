import mongoose, { Document } from 'mongoose';

export interface IDropShipping extends Document {
  supplierId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  status: string; // e.g., pending, shipped, delivered
}

const dropShippingSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
});

export default mongoose.model<IDropShipping>('DropShipping', dropShippingSchema);