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
exports.validateIP = void 0;
const User_1 = __importDefault(require("../models/User"));
const validateIP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const clientIP = req.ip || req.connection.remoteAddress || '';
        const whitelistedIPs = user.whitelistedIPs || [];
        if (whitelistedIPs.length > 0 && !whitelistedIPs.includes(clientIP)) {
            res.status(403).json({ error: 'Access denied. IP not whitelisted.' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.validateIP = validateIP;
