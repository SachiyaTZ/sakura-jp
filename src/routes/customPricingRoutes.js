"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customPricingController_1 = require("../controllers/customPricingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only route
router.post('/custom-pricing', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), customPricingController_1.setCustomPrice);
exports.default = router;
