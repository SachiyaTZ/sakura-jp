import mongoose, { Document } from 'mongoose';

export interface IReservedStock extends Document {
  customerId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const reservedStockSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IReservedStock>('ReservedStock', reservedStockSchema);