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
exports.setPaymentTerm = void 0;
const PaymentTerm_1 = __importDefault(require("../models/PaymentTerm"));
const setPaymentTerm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, term } = req.body;
    try {
        const paymentTerm = new PaymentTerm_1.default({ companyId, term });
        yield paymentTerm.save();
        res.status(201).json({ message: 'Payment term set successfully', paymentTerm });
    }
    catch (error) {
        res.status(500).json({ error: 'Error setting payment term' });
    }
});
exports.setPaymentTerm = setPaymentTerm;
