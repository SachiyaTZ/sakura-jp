"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discountController_1 = require("../controllers/discountController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected route
router.post('/discounts/apply', authMiddleware_1.authenticate, discountController_1.applyDiscount);
exports.default = router;
