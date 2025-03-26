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
exports.createBulkOrder = void 0;
const BulkOrder_1 = __importDefault(require("../models/BulkOrder"));
const createBulkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId, products, totalAmount } = req.body;
    try {
        const bulkOrder = new BulkOrder_1.default({ companyId, products, totalAmount });
        yield bulkOrder.save();
        res.status(201).json({ message: 'Bulk order created successfully', bulkOrder });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating bulk order' });
    }
});
exports.createBulkOrder = createBulkOrder;
