import mongoose, { Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  email: string;
  address: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
});

export default mongoose.model<ICompany>('Company', companySchema);