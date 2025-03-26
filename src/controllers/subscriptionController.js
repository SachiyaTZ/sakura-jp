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
exports.createDropShippingOrder = exports.createSubscription = void 0;
const Subscription_1 = __importDefault(require("../models/Subscription"));
const DropShipping_1 = __importDefault(require("../models/DropShipping"));
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, productId, quantity, frequency } = req.body;
    try {
        const subscription = new Subscription_1.default({ companyId, productId, quantity, frequency });
        yield subscription.save();
        res.status(201).json({ message: 'Subscription created successfully', subscription });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating subscription' });
    }
});
exports.createSubscription = createSubscription;
const createDropShippingOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { supplierId, productId } = req.body;
    try {
        const dropShippingOrder = new DropShipping_1.default({ supplierId, productId });
        yield dropShippingOrder.save();
        res.status(201).json({ message: 'Drop shipping order created successfully', dropShippingOrder });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating drop shipping order' });
    }
});
exports.createDropShippingOrder = createDropShippingOrder;
