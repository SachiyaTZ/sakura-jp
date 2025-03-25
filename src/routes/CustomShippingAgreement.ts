import mongoose, { Document } from 'mongoose';

export interface ICustomShippingAgreement extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  carrier: string; // e.g., FedEx, UPS
  terms: string; // e.g., Net 30, Net 60
  rate: number;
}

const customShippingAgreementSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  carrier: { type: String, required: true },
  terms: { type: String, required: true },
  rate: { type: Number, required: true },
});

export default mongoose.model<ICustomShippingAgreement>('CustomShippingAgreement', customShippingAgreementSchema);