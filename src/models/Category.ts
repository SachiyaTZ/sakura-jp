import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  brandId: mongoose.Schema.Types.ObjectId; // Associate category with a brand
  companyId: mongoose.Schema.Types.ObjectId; // Associate category with a company
  deleted: boolean; // Soft delete flag
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // Reference to Brand
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
  deleted: { type: Boolean, default: false }, // Soft delete flag
});

export default mongoose.model<ICategory>('Category', categorySchema);