import mongoose, { Document } from 'mongoose';

export interface ISubscriptionPlan extends Document {
  name: string;
  price: number;
  description: string;
  billingCycle: string;
  features: string[];
  isActive: boolean;
  deleted: boolean;
}

const subscriptionPlanSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  billingCycle: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'annually'],
    required: true
  },
  features: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model<ISubscriptionPlan>('SubscriptionPlan', subscriptionPlanSchema);