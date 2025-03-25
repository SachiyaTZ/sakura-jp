import mongoose, { Document } from 'mongoose';

export interface ISalesReport extends Document {
  date: Date;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

const salesReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  totalSales: { type: Number, required: true },
  totalOrders: { type: Number, required: true },
  averageOrderValue: { type: Number, required: true },
});

export default mongoose.model<ISalesReport>('SalesReport', salesReportSchema);