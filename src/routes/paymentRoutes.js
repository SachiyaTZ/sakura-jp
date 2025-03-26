"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.post('/payment-methods', authMiddleware_1.authenticate, paymentController_1.addPaymentMethod);
router.get('/users/:userId/payment-methods', authMiddleware_1.authenticate, paymentController_1.getPaymentMethods);
router.delete('/payment-methods/:id', authMiddleware_1.authenticate, paymentController_1.deletePaymentMethod);
router.post('/payments', authMiddleware_1.authenticate, paymentController_1.processPayment);
exports.default = router;
