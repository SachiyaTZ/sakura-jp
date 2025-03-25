import mongoose, { Document } from 'mongoose';

export interface ISalesPerformance extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

const salesPerformanceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  totalSales: { type: Number, required: true },
  totalOrders: { type: Number, required: true },
  averageOrderValue: { type: Number, required: true },
});

export default mongoose.model<ISalesPerformance>('SalesPerformance', salesPerformanceSchema);