import mongoose, { Document } from 'mongoose';

export interface IPricingTier extends Document {
  customerType: string;
  minVolume: number;
  maxVolume?: number;
  price: number;
}

const pricingTierSchema = new mongoose.Schema({
  customerType: { type: String, required: true },
  minVolume: { type: Number, required: true },
  maxVolume: { type: Number },
  price: { type: Number, required: true },
});

export default mongoose.model<IPricingTier>('PricingTier', pricingTierSchema);