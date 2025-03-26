"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customShippingAgreementSchema = new mongoose_1.default.Schema({
    companyId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
    carrier: { type: String, required: true },
    terms: { type: String, required: true },
    rate: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('CustomShippingAgreement', customShippingAgreementSchema);
