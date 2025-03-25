import mongoose, { Document } from 'mongoose';

export interface IInvoice extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: string; // e.g., unpaid, paid
  deleted: boolean; // Soft delete flag
}

const invoiceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['USD', 'EUR', 'INR', 'LKR', 'JPY'], default: 'USD' }, // Add currency field with enum validation
  status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  deleted: { type: Boolean, default: false }, // Soft delete flag
});

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);