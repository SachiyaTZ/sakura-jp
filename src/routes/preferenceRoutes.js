"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preferenceController_1 = require("../controllers/preferenceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.put('/preferences', authMiddleware_1.authenticate, preferenceController_1.updatePreferences);
router.get('/users/:userId/preferences', authMiddleware_1.authenticate, preferenceController_1.getPreferences);
exports.default = router;
