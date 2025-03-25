import mongoose, { Document } from 'mongoose';

export interface IDashboard extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  widgets: string[]; // List of widget IDs or names
}

const dashboardSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  widgets: [{ type: String }],
});

export default mongoose.model<IDashboard>('Dashboard', dashboardSchema);