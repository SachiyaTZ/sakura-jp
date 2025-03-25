import mongoose, { Document } from 'mongoose';

export interface ICustomerBehavior extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  totalOrders: number;
  totalSpent: number;
  lastPurchaseDate: Date;
}

const customerBehaviorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalOrders: { type: Number, required: true },
  totalSpent: { type: Number, required: true },
  lastPurchaseDate: { type: Date, required: true },
});

export default mongoose.model<ICustomerBehavior>('CustomerBehavior', customerBehaviorSchema);