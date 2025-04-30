// import mongoose, { Document } from 'mongoose';

// export interface ISubscription extends Document {
//   companyId: mongoose.Schema.Types.ObjectId;
//   productId: mongoose.Schema.Types.ObjectId;
//   quantity: number;
//   frequency: string;
//   status: string;
// }

// const subscriptionSchema = new mongoose.Schema({
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, required: true },
//   frequency: { type: String, enum: ['weekly', 'monthly', 'quarterly'], required: true },
//   status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
// });

// export default mongoose.model<ISubscription>('Subscription', subscriptionSchema);

import mongoose, { Document } from 'mongoose';

export interface ISubscription extends Document {
  companyId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  type: string;
  status: string;
  nextBillingDate: Date;
  deleted: boolean;
}

const subscriptionSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company', 
    required: true 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['daily', 'weekly', 'monthly', 'annually'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'paused', 'cancelled'], 
    default: 'active' 
  },
  nextBillingDate: { 
    type: Date, 
    required: true 
  },
  deleted: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

export default mongoose.model<ISubscription>('Subscription', subscriptionSchema);