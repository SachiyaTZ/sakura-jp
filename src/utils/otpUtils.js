"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.generateOTPSecret = void 0;
const speakeasy_1 = __importDefault(require("speakeasy"));
// Generate a TOTP secret
const generateOTPSecret = () => {
    return speakeasy_1.default.generateSecret({ length: 20 }).base32;
};
exports.generateOTPSecret = generateOTPSecret;
// Verify a TOTP code
const verifyOTP = (secret, token) => {
    return speakeasy_1.default.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 1, // Allow a 30-second window
    });
};
exports.verifyOTP = verifyOTP;
