import mongoose, { Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  companyId: mongoose.Schema.Types.ObjectId; // Associate brand with a company
  deleted: boolean; // Soft delete flag
}

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
  deleted: { type: Boolean, default: false }, // Soft delete flag
});

export default mongoose.model<IBrand>('Brand', brandSchema);