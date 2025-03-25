import mongoose, { Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  discountType: string; // e.g., percentage, fixed
  value: number;
  expiryDate: Date;
}

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
});

export default mongoose.model<IDiscount>('Discount', discountSchema);