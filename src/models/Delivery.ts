import mongoose, { Document } from 'mongoose';

export interface IDelivery extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  trackingNumber: string;
  status: string; // e.g., shipped, in transit, delivered
}

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  trackingNumber: { type: String, required: true },
  status: { type: String, enum: ['shipped', 'in transit', 'delivered'], default: 'shipped' },
});

export default mongoose.model<IDelivery>('Delivery', deliverySchema);