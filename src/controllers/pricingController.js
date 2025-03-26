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
exports.getPricingTiers = exports.addPricingTier = void 0;
const PricingTier_1 = __importDefault(require("../models/PricingTier"));
const addPricingTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerType, minVolume, maxVolume, price } = req.body;
    try {
        const pricingTier = new PricingTier_1.default({ customerType, minVolume, maxVolume, price });
        yield pricingTier.save();
        res.status(201).json({ message: 'Pricing tier added successfully', pricingTier });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding pricing tier' });
    }
});
exports.addPricingTier = addPricingTier;
const getPricingTiers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricingTiers = yield PricingTier_1.default.find();
        res.json(pricingTiers);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching pricing tiers' });
    }
});
exports.getPricingTiers = getPricingTiers;
