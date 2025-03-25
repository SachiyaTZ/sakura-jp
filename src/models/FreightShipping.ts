import mongoose, { Document } from 'mongoose';

export interface IFreightShipping extends Document {
  carrier: string; // e.g., FedEx Freight, UPS Freight
  service: string; // e.g., Standard, Express
  rate: number;
  estimatedDelivery: string; // e.g., 5-7 business days
}

const freightShippingSchema = new mongoose.Schema({
  carrier: { type: String, required: true },
  service: { type: String, required: true },
  rate: { type: Number, required: true },
  estimatedDelivery: { type: String, required: true },
});

export default mongoose.model<IFreightShipping>('FreightShipping', freightShippingSchema);