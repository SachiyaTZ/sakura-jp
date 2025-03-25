import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.post('/wishlist', authenticate, addToWishlist);
router.get('/users/:userId/wishlist', authenticate, getWishlist);
router.delete('/wishlist/:id', authenticate, removeFromWishlist);

export default router;