import mongoose, { Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentMethod: string; // e.g., credit_card, paypal, wallet
  status: string; // e.g., pending, completed, failed
}

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

export default mongoose.model<IPayment>('Payment', paymentSchema);