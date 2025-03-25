import mongoose, { Document } from 'mongoose';

export interface ICustomPricing extends Document {
  customerId: mongoose.Schema.Types.ObjectId;
  companyId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  price: number;
}

const customPricingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<ICustomPricing>('CustomPricing', customPricingSchema);