import mongoose, { Document } from 'mongoose';

export interface IPaymentTerm extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  term: string; // e.g., Net 30, Net 60
}

const paymentTermSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  term: { type: String, required: true },
});

export default mongoose.model<IPaymentTerm>('PaymentTerm', paymentTermSchema);