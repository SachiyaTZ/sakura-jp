import mongoose, { Document } from 'mongoose';

export interface IReturn extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  reason: string;
  status: string;
}

const returnSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

export default mongoose.model<IReturn>('Return', returnSchema);