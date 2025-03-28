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
exports.getPreferences = exports.updatePreferences = void 0;
const Preference_1 = __importDefault(require("../models/Preference"));
const updatePreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, theme, notifications } = req.body;
    try {
        const preferences = yield Preference_1.default.findOneAndUpdate({ userId }, { theme, notifications }, { new: true, upsert: true });
        res.json({ message: 'Preferences updated successfully', preferences });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating preferences' });
    }
});
exports.updatePreferences = updatePreferences;
const getPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const preferences = yield Preference_1.default.findOne({ userId });
        res.json(preferences);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching preferences' });
    }
});
exports.getPreferences = getPreferences;
