"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlistController_1 = require("../controllers/wishlistController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.post('/wishlist', authMiddleware_1.authenticate, wishlistController_1.addToWishlist);
router.get('/users/:userId/wishlist', authMiddleware_1.authenticate, wishlistController_1.getWishlist);
router.delete('/wishlist/:id', authMiddleware_1.authenticate, wishlistController_1.removeFromWishlist);
exports.default = router;
