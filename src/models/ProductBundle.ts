import mongoose, { Document } from 'mongoose';

export interface IProductBundle extends Document {
  name: string;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  price: number;
}

const productBundleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
  price: { type: Number, required: true },
});

export default mongoose.model<IProductBundle>('ProductBundle', productBundleSchema);