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
exports.processPayment = exports.deletePaymentMethod = exports.getPaymentMethods = exports.addPaymentMethod = void 0;
const PaymentMethod_1 = __importDefault(require("../models/PaymentMethod"));
const Payment_1 = __importDefault(require("../models/Payment"));
const addPaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cardNumber, cardHolder, expiryDate, cvv } = req.body;
    try {
        const paymentMethod = new PaymentMethod_1.default({ userId, cardNumber, cardHolder, expiryDate, cvv });
        yield paymentMethod.save();
        res.status(201).json({ message: 'Payment method added successfully', paymentMethod });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding payment method' });
    }
});
exports.addPaymentMethod = addPaymentMethod;
const getPaymentMethods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const paymentMethods = yield PaymentMethod_1.default.find({ userId });
        res.json(paymentMethods);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching payment methods' });
    }
});
exports.getPaymentMethods = getPaymentMethods;
const deletePaymentMethod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield PaymentMethod_1.default.findByIdAndDelete(id);
        res.json({ message: 'Payment method deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting payment method' });
    }
});
exports.deletePaymentMethod = deletePaymentMethod;
const processPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderId, amount, paymentMethod } = req.body;
    try {
        const payment = new Payment_1.default({ userId, orderId, amount, paymentMethod });
        yield payment.save();
        res.status(201).json({ message: 'Payment processed successfully', payment });
    }
    catch (error) {
        res.status(500).json({ error: 'Error processing payment' });
    }
});
exports.processPayment = processPayment;
