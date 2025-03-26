"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shippingController_1 = require("../controllers/shippingController");
const subscriptionController_1 = require("../controllers/subscriptionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public route
router.get('/shipping-rates', shippingController_1.getShippingRates);
router.get('/delivery/:trackingNumber', shippingController_1.trackDelivery);
router.get('/freight-shipping-options', shippingController_1.getFreightShippingOptions);
router.get('/delivery/:trackingNumber', shippingController_1.trackDelivery);
router.post('/drop-shipping', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), subscriptionController_1.createDropShippingOrder);
router.post('/custom-shipping-agreements', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), shippingController_1.createCustomShippingAgreement);
exports.default = router;
