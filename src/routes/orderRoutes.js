"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.get('/users/:userId/orders', authMiddleware_1.authenticate, orderController_1.getOrderHistory);
router.post('/orders', authMiddleware_1.authenticate, orderController_1.createOrder);
router.get('/orders/:orderId', authMiddleware_1.authenticate, orderController_1.trackOrder);
exports.default = router;
