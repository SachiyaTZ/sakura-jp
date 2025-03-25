import mongoose, { Document } from 'mongoose';

export interface IAddress extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

export default mongoose.model<IAddress>('Address', addressSchema);