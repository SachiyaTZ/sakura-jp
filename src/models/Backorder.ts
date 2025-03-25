import mongoose, { Document } from 'mongoose';

export interface IBackorder extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  status: string; // e.g., pending, fulfilled
}

const backorderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'fulfilled'], default: 'pending' },
});

export default mongoose.model<IBackorder>('Backorder', backorderSchema);