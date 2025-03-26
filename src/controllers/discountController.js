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
exports.applyDiscount = void 0;
const Discount_1 = __importDefault(require("../models/Discount"));
const applyDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, orderId } = req.body;
    try {
        const discount = yield Discount_1.default.findOne({ code });
        if (!discount || discount.expiryDate < new Date()) {
            res.status(400).json({ error: 'Invalid or expired discount code' });
            return;
        }
        // Apply discount logic here (e.g., update order total)
        res.json({ message: 'Discount applied successfully', discount });
    }
    catch (error) {
        res.status(500).json({ error: 'Error applying discount' });
    }
});
exports.applyDiscount = applyDiscount;
