import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: Date; // Add createdAt field
}

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field with default value
});

export default mongoose.model<IOrder>('Order', orderSchema);