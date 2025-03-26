"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.getWishlist = exports.addToWishlist = void 0;
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const addToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const wishlistItem = new Wishlist_1.default({ userId, productId });
        yield wishlistItem.save();
        res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding to wishlist' });
    }
});
exports.addToWishlist = addToWishlist;
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const wishlist = yield Wishlist_1.default.find({ userId }).populate('productId');
        res.json(wishlist);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching wishlist' });
    }
});
exports.getWishlist = getWishlist;
const removeFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Wishlist_1.default.findByIdAndDelete(id);
        res.json({ message: 'Product removed from wishlist' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error removing from wishlist' });
    }
});
exports.removeFromWishlist = removeFromWishlist;
