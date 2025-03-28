"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const salesReportSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true },
    totalSales: { type: Number, required: true },
    totalOrders: { type: Number, required: true },
    averageOrderValue: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('SalesReport', salesReportSchema);
