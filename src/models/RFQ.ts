import mongoose, { Document } from 'mongoose';

export interface IRFQ extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  status: string;
}

const rfqSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ['pending', 'quoted', 'rejected'], default: 'pending' },
});

export default mongoose.model<IRFQ>('RFQ', rfqSchema);