"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Admin-only routes
router.post('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), brandController_1.addBrand);
router.get('/', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), brandController_1.getAllBrands);
router.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), brandController_1.getBrandById);
router.put('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), brandController_1.updateBrand);
router.delete('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)(['admin']), brandController_1.softDeleteBrand);
exports.default = router;
