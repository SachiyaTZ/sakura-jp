import mongoose, { Document } from 'mongoose';

export interface IWishlist extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
}

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);