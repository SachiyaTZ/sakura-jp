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
exports.trackOrder = exports.createOrder = exports.getOrderHistory = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const getOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield Order_1.default.find({ userId }).populate('productId');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching order history' });
    }
});
exports.getOrderHistory = getOrderHistory;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity, totalPrice } = req.body;
    try {
        const order = new Order_1.default({ userId, productId, quantity, totalPrice });
        yield order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
});
exports.createOrder = createOrder;
const trackOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    try {
        const order = yield Order_1.default.findById(orderId).populate('productId');
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Error tracking order' });
    }
});
exports.trackOrder = trackOrder;
