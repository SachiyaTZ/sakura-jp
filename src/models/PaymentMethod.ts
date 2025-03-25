import mongoose, { Document } from 'mongoose';

export interface IPaymentMethod extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const paymentMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

export default mongoose.model<IPaymentMethod>('PaymentMethod', paymentMethodSchema);