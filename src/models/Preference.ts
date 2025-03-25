import mongoose, { Document } from 'mongoose';

export interface IPreference extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  theme: string;
  notifications: boolean;
}

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, default: 'light' },
  notifications: { type: Boolean, default: true },
});

export default mongoose.model<IPreference>('Preference', preferenceSchema);