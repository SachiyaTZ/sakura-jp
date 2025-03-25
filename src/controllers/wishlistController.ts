import { Request, Response } from 'express';
import Wishlist from '../models/Wishlist';

export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;

  try {
    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();
    res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
};

export const getWishlist = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.find({ userId }).populate('productId');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
};

export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await Wishlist.findByIdAndDelete(id);
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
};