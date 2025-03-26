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
exports.requestReturn = void 0;
const Return_1 = __importDefault(require("../models/Return"));
const requestReturn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, reason } = req.body;
    try {
        const returnRequest = new Return_1.default({ orderId, reason });
        yield returnRequest.save();
        res.status(201).json({ message: 'Return request submitted', returnRequest });
    }
    catch (error) {
        res.status(500).json({ error: 'Error requesting return' });
    }
});
exports.requestReturn = requestReturn;
