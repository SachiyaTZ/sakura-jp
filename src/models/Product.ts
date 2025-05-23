// import mongoose, { Document } from 'mongoose';

// export interface IProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   stock: number; // Stock field
//   ratings?: { userId: string; rating: number }[];
//   reviews?: { userId: string; review: string }[];
//   moq?: number; // Minimum Order Quantity
// }

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   stock: { type: Number, required: true, default: 0 }, // Ensure stock is required and defaults to 0
//   ratings: {
//     type: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         rating: { type: Number, min: 1, max: 5 },
//       },
//     ],
//     default: [], // Initialize as an empty array
//   },
//   reviews: {
//     type: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         review: { type: String },
//       },
//     ],
//     default: [], // Initialize as an empty array
//   },
//   moq: { type: Number, default: 1 }, // Minimum Order Quantity
// });

// export default mongoose.model<IProduct>('Product', productSchema);

// ------------------------------------------------------------------------------------

// import mongoose, { Document } from 'mongoose';

// export interface IProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   subCategory: string; // New field
//   brand: mongoose.Schema.Types.ObjectId; // New field
//   company: mongoose.Schema.Types.ObjectId; // New field
//   stock: number;
//   colors: string[]; // New field
//   sizes: string[]; // New field (for apparel/clothing sizes)
//   babyClothSizes: string[]; // New field (for baby clothing sizes)
//   ratings?: { userId: string; rating: number }[];
//   reviews?: { userId: string; review: string }[];
//   moq?: number; // Minimum Order Quantity
//   deleted: boolean; // Soft delete flag
// }

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String, required: true }, // New field
//   brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // New field
//   company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // New field
//   stock: { type: Number, required: true, default: 0 },
//   colors: { type: [String], default: [] }, // New field
//   sizes: { type: [String], default: [] }, // New field (for apparel/clothing sizes)
//   babyClothSizes: { type: [String], default: [] }, // New field (for baby clothing sizes)
//   ratings: {
//     type: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         rating: { type: Number, min: 1, max: 5 },
//       },
//     ],
//     default: [],
//   },
//   reviews: {
//     type: [
//       {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         review: { type: String },
//       },
//     ],
//     default: [],
//   },
//   moq: { type: Number, default: 1 }, // Minimum Order Quantity
//   deleted: { type: Boolean, default: false }, // Soft delete flag
// });

// export default mongoose.model<IProduct>('Product', productSchema);

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  brand: mongoose.Schema.Types.ObjectId;
  company: mongoose.Schema.Types.ObjectId;
  stock: number;
  colors: string[];
  sizes: string[];
  babyClothSizes: string[];
  images: string[];
  ratings?: { userId: string; rating: number }[];
  reviews?: { userId: string; review: string }[];
  moq?: number;
  deleted: boolean;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  stock: { type: Number, required: true, default: 0 },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  babyClothSizes: { type: [String], default: [] },
  images: { type: [String], default: [] },
  ratings: {
    type: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    default: [],
  },
  reviews: {
    type: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: { type: String },
      },
    ],
    default: [],
  },
  moq: { type: Number, default: 1 },
  deleted: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
});

export default mongoose.model<IProduct>('Product', productSchema);