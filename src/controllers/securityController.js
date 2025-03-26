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
exports.removeWhitelistedIP = exports.addWhitelistedIP = exports.disable2FA = exports.enable2FA = void 0;
const User_1 = __importDefault(require("../models/User"));
const speakeasy_1 = __importDefault(require("speakeasy")); // For generating TOTP secrets
// Enable 2FA for a user
const enable2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Generate a TOTP secret
        const secret = speakeasy_1.default.generateSecret({ length: 20 });
        user.twoFASecret = secret.base32;
        user.is2FAEnabled = true;
        yield user.save();
        res.status(200).json({ secret: secret.base32 });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to enable 2FA' });
    }
});
exports.enable2FA = enable2FA;
// Disable 2FA for a user
const disable2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        user.twoFASecret = undefined;
        user.is2FAEnabled = false;
        yield user.save();
        res.status(200).json({ message: '2FA disabled successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to disable 2FA' });
    }
});
exports.disable2FA = disable2FA;
// Add an IP to the whitelist
const addWhitelistedIP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, ip } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (!user.whitelistedIPs.includes(ip)) {
            user.whitelistedIPs.push(ip);
            yield user.save();
        }
        res.status(200).json({ message: 'IP added to whitelist', whitelistedIPs: user.whitelistedIPs });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add IP to whitelist' });
    }
});
exports.addWhitelistedIP = addWhitelistedIP;
// Remove an IP from the whitelist
const removeWhitelistedIP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, ip } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        user.whitelistedIPs = user.whitelistedIPs.filter((whitelistedIP) => whitelistedIP !== ip);
        yield user.save();
        res.status(200).json({ message: 'IP removed from whitelist', whitelistedIPs: user.whitelistedIPs });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove IP from whitelist' });
    }
});
exports.removeWhitelistedIP = removeWhitelistedIP;
