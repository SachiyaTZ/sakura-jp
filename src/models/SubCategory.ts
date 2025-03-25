import mongoose, { Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  brandId: mongoose.Schema.Types.ObjectId; // Associate subcategory with a brand
  categoryId: mongoose.Schema.Types.ObjectId; // Associate subcategory with a category
  companyId: mongoose.Schema.Types.ObjectId; // Associate subcategory with a company
  deleted: boolean; // Soft delete flag
}

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // Reference to Brand
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
  deleted: { type: Boolean, default: false }, // Soft delete flag
});

export default mongoose.model<ISubCategory>('SubCategory', subCategorySchema);