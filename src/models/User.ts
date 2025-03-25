import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  is2FAEnabled: boolean;
  twoFASecret?: string;
  whitelistedIPs: string[]; // No longer optional
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'buyer' },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  is2FAEnabled: { type: Boolean, default: false },
  twoFASecret: { type: String },
  whitelistedIPs: { type: [String], default: [] }, // Default to empty array
});

export default mongoose.model<IUser>('User', userSchema);