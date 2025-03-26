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
exports.reserveStock = void 0;
const ReservedStock_1 = __importDefault(require("../models/ReservedStock"));
const reserveStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, productId, quantity } = req.body;
    try {
        const reservedStock = new ReservedStock_1.default({ customerId, productId, quantity });
        yield reservedStock.save();
        res.status(201).json({ message: 'Stock reserved successfully', reservedStock });
    }
    catch (error) {
        res.status(500).json({ error: 'Error reserving stock' });
    }
});
exports.reserveStock = reserveStock;
