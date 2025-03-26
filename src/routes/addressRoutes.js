"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controllers/addressController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Protected routes
router.post('/addresses', authMiddleware_1.authenticate, addressController_1.addAddress);
router.get('/users/:userId/addresses', authMiddleware_1.authenticate, addressController_1.getAddresses);
router.put('/addresses/:id', authMiddleware_1.authenticate, addressController_1.updateAddress);
router.delete('/addresses/:id', authMiddleware_1.authenticate, addressController_1.deleteAddress);
exports.default = router;
