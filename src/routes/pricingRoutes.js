"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pricingController_1 = require("../controllers/pricingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), pricingController_1.addPricingTier);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), pricingController_1.getPricingTiers);
exports.default = router;
