import mongoose, { Document } from 'mongoose';

export interface IShippingRate extends Document {
  carrier: string; // e.g., FedEx, UPS
  service: string; // e.g., Standard, Express
  rate: number;
  estimatedDelivery: string; // e.g., 3-5 business days
}

const shippingRateSchema = new mongoose.Schema({
  carrier: { type: String, required: true },
  service: { type: String, required: true },
  rate: { type: Number, required: true },
  estimatedDelivery: { type: String, required: true },
});

export default mongoose.model<IShippingRate>('ShippingRate', shippingRateSchema);