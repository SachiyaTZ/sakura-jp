import mongoose, { Document } from 'mongoose';

export interface ICustomPricing extends Document {
  customerId: mongoose.Schema.Types.ObjectId;
  companyId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  price: number;
  isDeleted?: boolean;
  deletedAt?: Date;
  deletedBy?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const customPricingSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
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
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

export default mongoose.model<ICustomPricing>('CustomPricing', customPricingSchema);