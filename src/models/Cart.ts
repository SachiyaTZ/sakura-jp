import mongoose, { Document } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
}

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<ICart>('Cart', cartSchema);