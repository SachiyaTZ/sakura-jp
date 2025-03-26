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
exports.createCustomShippingAgreement = exports.createDropShippingOrder = exports.getFreightShippingOptions = exports.trackDelivery = exports.getShippingRates = void 0;
const ShippingRate_1 = __importDefault(require("../models/ShippingRate"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const FreightShipping_1 = __importDefault(require("../models/FreightShipping"));
const DropShipping_1 = __importDefault(require("../models/DropShipping"));
const CustomShippingAgreement_1 = __importDefault(require("../routes/CustomShippingAgreement"));
const getShippingRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, destination } = req.query;
    try {
        // Simulate fetching rates from a carrier API
        const rates = yield ShippingRate_1.default.find();
        res.json(rates);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching shipping rates' });
    }
});
exports.getShippingRates = getShippingRates;
const trackDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackingNumber } = req.params;
    try {
        const delivery = yield Delivery_1.default.findOne({ trackingNumber }).populate('orderId');
        if (!delivery) {
            res.status(404).json({ error: 'Delivery not found' });
            return;
        }
        res.json(delivery);
    }
    catch (error) {
        res.status(500).json({ error: 'Error tracking delivery' });
    }
});
exports.trackDelivery = trackDelivery;
const getFreightShippingOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, destination } = req.query;
    try {
        // Simulate fetching freight options
        const options = yield FreightShipping_1.default.find();
        res.json(options);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching freight shipping options' });
    }
});
exports.getFreightShippingOptions = getFreightShippingOptions;
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
const createCustomShippingAgreement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, carrier, terms, rate } = req.body;
    try {
        const agreement = new CustomShippingAgreement_1.default({ companyId, carrier, terms, rate });
        yield agreement.save();
        res.status(201).json({ message: 'Custom shipping agreement created successfully', agreement });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating custom shipping agreement' });
    }
});
exports.createCustomShippingAgreement = createCustomShippingAgreement;
