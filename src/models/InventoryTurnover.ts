import mongoose, { Document } from 'mongoose';

export interface IInventoryTurnover extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  turnoverRate: number; // Inventory turnover rate (e.g., 2.5)
  date: Date;
}

const inventoryTurnoverSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  turnoverRate: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IInventoryTurnover>('InventoryTurnover', inventoryTurnoverSchema);