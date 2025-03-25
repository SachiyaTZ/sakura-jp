// import mongoose, { Document } from 'mongoose';

// export interface IWarehouse extends Document {
//   name: string;
//   location: string;
//   products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
// }

// const warehouseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
// });

// export default mongoose.model<IWarehouse>('Warehouse', warehouseSchema);

import mongoose, { Document } from 'mongoose';

export interface IWarehouse extends Document {
  name: string;
  location: string;
  companyId: mongoose.Schema.Types.ObjectId; // Associate warehouse with a company
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  deleted: boolean; // Soft delete flag
}

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // Reference to Company
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  deleted: { type: Boolean, default: false }, // Soft delete flag
});

export default mongoose.model<IWarehouse>('Warehouse', warehouseSchema);